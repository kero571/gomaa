// lib/reviews.js — public reviews via Firestore REST (no Firebase SDK on the public site) + Cloudinary upload.
const PROJECT = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents`;
const JSON_HEADERS = { "Content-Type": "application/json" };

export const LIMITS = { name: 40, text: 600 };

const s = (f) => f?.stringValue || "";
const n = (f) => (f?.integerValue != null ? Number(f.integerValue) : 0);

function decode(d) {
  const f = d.fields || {};
  return {
    id: d.name.split("/").pop(),
    name: s(f.name),
    role: s(f.role),
    text: s(f.text),
    avatar: s(f.avatar),
    image: s(f.image),
    rating: n(f.rating) || 5,
    sort: n(f.sort),
  };
}

// "sort" = creation time in ms. Hidden reviews have it negated, so one range query (sort > 0)
// returns only visible ones and needs no composite index.
export async function fetchReviews(limit = 60) {
  const r = await fetch(`${BASE}:runQuery?key=${KEY}`, {
    method: "POST",
    headers: JSON_HEADERS,
    cache: "no-store",
    body: JSON.stringify({
      structuredQuery: {
        from: [{ collectionId: "reviews" }],
        where: { fieldFilter: { field: { fieldPath: "sort" }, op: "GREATER_THAN", value: { integerValue: "0" } } },
        orderBy: [{ field: { fieldPath: "sort" }, direction: "DESCENDING" }],
        limit,
      },
    }),
  });
  if (!r.ok) throw new Error("load");
  const rows = await r.json();
  return rows.filter((x) => x.document).map((x) => decode(x.document));
}

export async function createReview({ name, text, rating, avatar, image }) {
  const fields = {
    name: { stringValue: name },
    rating: { integerValue: String(rating) },
    sort: { integerValue: String(Date.now()) },
  };
  if (text) fields.text = { stringValue: text };
  if (avatar) fields.avatar = { stringValue: avatar };
  if (image) fields.image = { stringValue: image };
  const r = await fetch(`${BASE}/reviews?key=${KEY}`, { method: "POST", headers: JSON_HEADERS, body: JSON.stringify({ fields }) });
  if (!r.ok) throw new Error("تعذر إرسال الرأي، جرّب تاني بعد شوية");
  return decode(await r.json());
}

// Shrinks the photo in the browser first (max side + JPEG) so Cloudinary only stores a small file
// and we can serve it as-is, with no Cloudinary transformations.
function shrink(file, max, square) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      let sw = img.naturalWidth, sh = img.naturalHeight, sx = 0, sy = 0;
      if (square) { const m = Math.min(sw, sh); sx = (sw - m) / 2; sy = (sh - m) / 2; sw = sh = m; }
      const k = Math.min(1, max / Math.max(sw, sh));
      const w = Math.max(1, Math.round(sw * k)), h = Math.max(1, Math.round(sh * k));
      const c = document.createElement("canvas");
      c.width = w; c.height = h;
      const ctx = c.getContext("2d");
      ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
      c.toBlob((b) => (b ? resolve(b) : reject(new Error("img"))), "image/jpeg", 0.82);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("img")); };
    img.src = url;
  });
}

export async function uploadReviewImage(file, kind) {
  const fail = new Error("تعذر رفع الصورة، جرّب صورة تانية أو ابعت الرأي من غيرها");
  if (!file.type.startsWith("image/") || file.size > 10e6) throw new Error("الصورة لازم تكون ملف صورة وأقل من 10MB");
  try {
    const blob = await shrink(file, kind === "avatar" ? 240 : 1000, kind === "avatar");
    const sr = await fetch("/api/reviews/sign", { method: "POST" });
    if (!sr.ok) throw fail;
    const sg = await sr.json();
    const fd = new FormData();
    fd.append("file", blob, "review.jpg");
    ["api_key", "timestamp", "signature", "folder", "allowed_formats"].forEach((k) => fd.append(k, sg[k]));
    const r = await fetch(`https://api.cloudinary.com/v1_1/${sg.cloudName}/image/upload`, { method: "POST", body: fd });
    const j = await r.json();
    if (!j.secure_url) throw fail;
    return j.secure_url;
  } catch {
    throw fail;
  }
}
