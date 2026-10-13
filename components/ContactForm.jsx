"use client";
import Icon from "./ui/Icon";
import { SITE } from "@/lib/site";

// Opens the user's mail client with the form data (no backend needed).
export default function ContactForm() {
  function onSubmit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `الاسم: ${f.get("name")}\nالهاتف: ${f.get("phone")}\nنوع المشروع: ${f.get("type")}\n\nالتفاصيل:\n${f.get("details")}`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent("طلب مشروع جديد")}&body=${encodeURIComponent(body)}`;
  }
  return (
    <form onSubmit={onSubmit} className="card mt-4 grid gap-4 p-5 text-start">
      <label className="grid gap-1.5 text-xs font-semibold">الاسم الكريم
        <input name="name" required autoComplete="name" placeholder="مثال: أحمد عبد الله" className="field" />
      </label>
      <label className="grid gap-1.5 text-xs font-semibold">رقم الهاتف أو الواتساب
        <input name="phone" required type="tel" inputMode="tel" autoComplete="tel" placeholder="+966 50 000 0000" className="field" dir="ltr" />
      </label>
      <label className="grid gap-1.5 text-xs font-semibold">نوع المشروع المطلوب
        <select name="type" className="field">
          <option>مجموعة مقاطع ريلز أو تيك توك (9:16)</option>
          <option>فيديو يوتيوب</option>
          <option>إعلان تجاري</option>
          <option>موشن جرافيك</option>
        </select>
      </label>
      <label className="grid gap-1.5 text-xs font-semibold">تفاصيل عن الفكرة
        <textarea name="details" rows={4} placeholder="أرفق تفاصيل أو روابط للمراجع..." className="field resize-none" />
      </label>
      <button type="submit" className="btn w-full"><Icon name="send" className="h-4 w-4 -scale-x-100" /> إرسال تفاصيل المشروع</button>
    </form>
  );
}
