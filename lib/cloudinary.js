import { fb } from "@/lib/firebase";

const LIMITS = { image: 10, video: 100 }; // MB (Cloudinary free plan)

// Poster image taken from the video at second 2 (9:16, small, auto format).
export function videoPoster(url) {
  if (!url || !url.includes("res.cloudinary.com") || !url.includes("/video/upload/")) return "";
  return url
    .replace("/upload/", "/upload/so_2,c_fill,ar_9:16,w_480,q_auto,f_auto/")
    .replace(/\.[a-z0-9]+(\?.*)?$/i, ".jpg");
}

// Signed upload: asks /api/cloudinary/sign for a signature, then uploads straight to Cloudinary.
export async function uploadToCloudinary(file, onProgress) {
  const resourceType = file.type.startsWith("video/") ? "video" : "image";
  if (file.size > LIMITS[resourceType] * 1024 * 1024) {
    throw new Error(`حجم الملف أكبر من ${LIMITS[resourceType]}MB`);
  }

  const user = fb().auth.currentUser;
  if (!user) throw new Error("سجّل الدخول الأول");
  const token = await user.getIdToken();

  const res = await fetch("/api/cloudinary/sign", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: "{}",
  });
  const sig = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(sig.error || "فشل تجهيز الرفع");

  const form = new FormData();
  form.append("file", file);
  form.append("api_key", sig.apiKey);
  form.append("timestamp", sig.timestamp);
  form.append("folder", sig.folder);
  form.append("signature", sig.signature);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `https://api.cloudinary.com/v1_1/${sig.cloudName}/${resourceType}/upload`);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress?.(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      let body = {};
      try { body = JSON.parse(xhr.responseText); } catch {}
      if (xhr.status >= 200 && xhr.status < 300 && body.secure_url) {
        resolve({ url: body.secure_url, type: resourceType });
      } else {
        reject(new Error(body?.error?.message || "فشل الرفع"));
      }
    };
    xhr.onerror = () => reject(new Error("مشكلة في الاتصال أثناء الرفع"));
    xhr.send(form);
  });
}
