"use client";
import { useCallback, useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc } from "firebase/firestore";
import { fb } from "@/lib/firebase";
import { Field, Group, ghost } from "./ui";

const col = () => collection(fb().db, "reviews");
const when = (ms) => new Date(Math.abs(ms)).toLocaleDateString("ar-EG");

function Row({ r, busy, onToggle, onDelete, onSave }) {
  const [edit, setEdit] = useState(false);
  const [f, setF] = useState({ name: r.name || "", text: r.text || "", rating: r.rating || 5 });
  const hidden = r.sort <= 0;

  return (
    <div className={`rounded-2xl border p-4 ${hidden ? "border-yellow-300/30 bg-yellow-300/5" : "border-brand/15 bg-black/20"}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          {r.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={r.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
          ) : (
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand font-black text-black">{(r.name || "?").trim().charAt(0)}</span>
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-extrabold">{r.name} <span className="text-brand">{"★".repeat(r.rating || 5)}</span></p>
            <p className="text-[11px] text-white/50">{when(r.sort)} • {hidden ? "مخفي" : "ظاهر"}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button type="button" disabled={busy} className={ghost} onClick={() => setEdit((v) => !v)}>{edit ? "إغلاق" : "تعديل"}</button>
          <button type="button" disabled={busy} className={ghost} onClick={() => onToggle(r)}>{hidden ? "إظهار" : "إخفاء"}</button>
          <button type="button" disabled={busy} className={`${ghost} text-red-400`} onClick={() => onDelete(r)}>حذف</button>
        </div>
      </div>

      {!edit && r.text && <p className="mt-3 whitespace-pre-line text-xs leading-6 text-white/70">{r.text}</p>}
      {r.image && (
        <a href={r.image} target="_blank" rel="noopener noreferrer" className="mt-3 block w-fit">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={r.image} alt="" className="max-h-40 rounded-xl border border-brand/20" />
        </a>
      )}

      {edit && (
        <div className="mt-3 grid gap-3">
          <Field label="الاسم" value={f.name} onChange={(v) => setF({ ...f, name: v })} />
          <Field label="الرأي" value={f.text} onChange={(v) => setF({ ...f, text: v })} multiline />
          <label className="grid gap-1.5 text-xs font-semibold">
            التقييم
            <select className="field [&>option]:bg-bg [&>option]:text-white" value={f.rating} onChange={(e) => setF({ ...f, rating: Number(e.target.value) })}>
              {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </label>
          <button type="button" disabled={busy} className="btn !py-2.5 disabled:opacity-50" onClick={async () => { if (await onSave(r, f)) setEdit(false); }}>
            حفظ التعديل
          </button>
        </div>
      )}
    </div>
  );
}

export default function ReviewsTab({ c, set }) {
  const h = c.sections?.reviews || {};
  const upd = (field) => (v) => set("sections", (p) => ({ ...p, reviews: { ...(p.reviews || {}), [field]: v } }));
  const [rows, setRows] = useState(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      const snap = await getDocs(query(col(), orderBy("sort", "desc")));
      setRows(snap.docs.map((d) => ({ id: d.id, ...d.data() })).sort((a, b) => Math.abs(b.sort) - Math.abs(a.sort)));
      setErr("");
    } catch {
      setRows([]);
      setErr("تعذر تحميل الآراء. اتأكد إن قواعد Firestore اتنشرت وإنك داخل بإيميل الأدمن.");
    }
  }, []);
  useEffect(() => { load(); }, [load]);

  async function run(fn) {
    setBusy(true);
    setErr("");
    try { await fn(); await load(); return true; } catch { setErr("فشلت العملية، جرّب تاني."); return false; } finally { setBusy(false); }
  }

  const toggle = (r) => run(() => updateDoc(doc(fb().db, "reviews", r.id), { sort: -r.sort }));
  const remove = (r) => window.confirm(`حذف رأي "${r.name}" نهائياً؟`) && run(() => deleteDoc(doc(fb().db, "reviews", r.id)));
  const save = (r, f) => run(() => updateDoc(doc(fb().db, "reviews", r.id), { name: f.name.trim().slice(0, 40), text: f.text.trim().slice(0, 600), rating: f.rating }));

  return (
    <div className="grid gap-4">
      <Group title="عناوين القسم">
        <Field label="العنوان الصغير" value={h.eyebrow ?? "آراء العملاء"} onChange={upd("eyebrow")} />
        <Field label="العنوان" value={h.title ?? "ماذا يقول صُنّاع المحتوى؟"} onChange={upd("title")} />
        <Field label="عنوان الفورم" value={h.formTitle ?? "شاركنا رأيك"} onChange={upd("formTitle")} />
        <label className="flex items-center gap-2 text-xs font-semibold">
          <input type="checkbox" checked={h.formOpen !== false} onChange={(e) => upd("formOpen")(e.target.checked)} />
          السماح للزوار بإضافة رأي (لو قفلته الفورم بيختفي)
        </label>
        <p className="text-[11px] text-white/50">العناوين محتاجة زرار "حفظ ونشر". أما إخفاء الآراء وحذفها وتعديلها فبتتنفذ فوراً.</p>
      </Group>

      <Group title={`الآراء${rows ? ` (${rows.length})` : ""}`}>
        {err && <p className="text-xs text-red-400" role="alert">{err}</p>}
        {rows === null && <p className="text-xs text-white/60">جاري التحميل…</p>}
        {rows && rows.length === 0 && !err && <p className="text-xs text-white/60">لسه مفيش آراء.</p>}
        {(rows || []).map((r) => (
          <Row key={r.id} r={r} busy={busy} onToggle={toggle} onDelete={remove} onSave={save} />
        ))}
        <div className="flex flex-wrap gap-2">
          <button type="button" disabled={busy} className={ghost} onClick={load}>تحديث القايمة</button>
        </div>
      </Group>
    </div>
  );
}
