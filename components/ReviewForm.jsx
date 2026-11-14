"use client";
import { useState } from "react";
import Icon from "./ui/Icon";
import { createReview, uploadReviewImage, LIMITS } from "@/lib/reviews";

const pill = "cursor-pointer rounded-xl border border-brand/30 bg-white/[0.06] px-4 py-2 text-xs font-bold transition hover:border-brand";

export default function ReviewForm({ title, onAdded }) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [avatarFile, setAvatarFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [hp, setHp] = useState(""); // honeypot: real people never fill it
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [done, setDone] = useState(false);

  const pick = (setFile) => (e) => {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    if (!f.type.startsWith("image/")) return setErr("اختار ملف صورة");
    setErr("");
    setFile(f);
  };

  async function submit(e) {
    e.preventDefault();
    if (busy) return;
    setErr("");
    if (hp) return setDone(true);
    const nm = name.trim();
    const tx = text.trim();
    if (nm.length < 2) return setErr("اكتب اسمك (حرفين على الأقل)");
    if (!tx && !imageFile) return setErr("اكتب رأيك أو أضف صورة");
    try {
      if (Date.now() - Number(localStorage.getItem("rv_last") || 0) < 120000) return setErr("استنى دقيقتين قبل ما تضيف رأي تاني");
    } catch {}
    setBusy(true);
    try {
      const [avatar, image] = await Promise.all([
        avatarFile ? uploadReviewImage(avatarFile, "avatar") : "",
        imageFile ? uploadReviewImage(imageFile, "image") : "",
      ]);
      const review = await createReview({ name: nm, text: tx, rating, avatar, image });
      try { localStorage.setItem("rv_last", String(Date.now())); } catch {}
      onAdded(review);
      setName(""); setText(""); setRating(5); setAvatarFile(null); setImageFile(null);
      setDone(true);
    } catch (x) {
      setErr(x?.message || "حصلت مشكلة، جرّب تاني");
    }
    setBusy(false);
  }

  if (done)
    return (
      <div className="card mx-auto mt-6 max-w-2xl p-6 text-center">
        <p className="text-sm font-extrabold text-brand">شكراً ليك! رأيك اتنشر.</p>
        <button type="button" onClick={() => setDone(false)} className={`${pill} mt-4`}>إضافة رأي آخر</button>
      </div>
    );

  return (
    <form onSubmit={submit} className="card mx-auto mt-6 grid max-w-2xl gap-4 p-5 md:p-6">
      <h3 className="text-sm font-extrabold text-brand">{title}</h3>

      <label className="grid gap-1.5 text-xs font-semibold">
        الاسم
        <input type="text" className="field" value={name} maxLength={LIMITS.name} onChange={(e) => setName(e.target.value)} required />
      </label>

      <div className="grid gap-1.5 text-xs font-semibold">
        التقييم
        <div className="flex gap-1" role="radiogroup" aria-label="التقييم">
          {[1, 2, 3, 4, 5].map((i) => (
            <button key={i} type="button" role="radio" aria-checked={rating === i} aria-label={`${i} من 5`} onClick={() => setRating(i)}>
              <Icon name="star" className={`h-6 w-6 ${i <= rating ? "text-brand" : "text-white/20"}`} />
            </button>
          ))}
        </div>
      </div>

      <label className="grid gap-1.5 text-xs font-semibold">
        رأيك
        <textarea rows={4} className="field resize-y" value={text} maxLength={LIMITS.text} onChange={(e) => setText(e.target.value)} placeholder="اكتب رأيك هنا، أو أضف صورة بدل الكلام" />
      </label>

      <div className="flex flex-wrap items-center gap-2">
        <label className={pill}>
          {avatarFile ? "تغيير صورتك" : "صورتك (اختياري)"}
          <input type="file" accept="image/*" className="hidden" onChange={pick(setAvatarFile)} />
        </label>
        <label className={pill}>
          {imageFile ? "تغيير الصورة" : "صورة بدل الكلام (اختياري)"}
          <input type="file" accept="image/*" className="hidden" onChange={pick(setImageFile)} />
        </label>
        {avatarFile && <button type="button" className="text-[11px] text-white/60 underline" onClick={() => setAvatarFile(null)}>إزالة صورتك</button>}
        {imageFile && <button type="button" className="text-[11px] text-white/60 underline" onClick={() => setImageFile(null)}>إزالة الصورة</button>}
      </div>
      {(avatarFile || imageFile) && (
        <p className="text-[11px] text-white/50" dir="auto">{[avatarFile?.name, imageFile?.name].filter(Boolean).join(" • ")}</p>
      )}

      <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={hp} onChange={(e) => setHp(e.target.value)} className="hidden" name="website" />

      {err && <p className="text-xs text-red-400" role="alert">{err}</p>}
      <button type="submit" disabled={busy} className="btn disabled:opacity-50">
        {busy ? "جاري الإرسال…" : "إضافة الرأي"}
      </button>
    </form>
  );
}
