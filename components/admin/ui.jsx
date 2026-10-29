"use client";
import { useRef, useState } from "react";
import Icon from "@/components/ui/Icon";
import { uploadToCloudinary } from "@/lib/cloudinary";

export const ICONS = ["film", "sparkle", "zap", "palette", "eye", "clock", "star", "pen", "doc", "user"];
export const SOCIAL_ICONS = ["instagram", "facebook", "youtube", "tiktok", "behance", "mail", "phone"];

export const ghost =
  "rounded-xl border border-brand/30 bg-white/[0.06] px-4 py-2 text-xs font-bold transition hover:border-brand disabled:opacity-50";

export function Group({ title, children }) {
  return (
    <section className="card grid gap-4 p-5">
      <h3 className="text-sm font-extrabold text-brand">{title}</h3>
      {children}
    </section>
  );
}

export function Field({ label, value, onChange, multiline = false, ltr = false, rows = 3 }) {
  const common = {
    value: value ?? "",
    onChange: (e) => onChange(e.target.value),
    dir: ltr ? "ltr" : undefined,
  };
  return (
    <label className="grid gap-1.5 text-xs font-semibold">
      {label}
      {multiline ? (
        <textarea rows={rows} className="field resize-y" {...common} />
      ) : (
        <input type="text" className="field" {...common} />
      )}
    </label>
  );
}

export function IconSelect({ label, value, onChange, options }) {
  return (
    <label className="grid gap-1.5 text-xs font-semibold">
      {label}
      <span className="flex items-center gap-2">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand">
          <Icon name={value} />
        </span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="field [&>option]:bg-bg [&>option]:text-white"
          dir="ltr"
        >
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </span>
    </label>
  );
}

// Uploads one or many files to Cloudinary, calls onDone({url,type}) for each.
export function Uploader({ label, accept, multiple = false, onDone }) {
  const ref = useRef(null);
  const [state, setState] = useState(null);
  const [err, setErr] = useState("");

  async function pick(e) {
    const files = Array.from(e.target.files || []);
    e.target.value = "";
    if (!files.length) return;
    setErr("");
    for (let i = 0; i < files.length; i++) {
      const n = files.length;
      setState({ i: i + 1, n, p: 0 });
      try {
        const res = await uploadToCloudinary(files[i], (p) => setState({ i: i + 1, n, p }));
        onDone(res);
      } catch (er) {
        setErr(er?.message || "فشل الرفع");
        break;
      }
    }
    setState(null);
  }

  const text = state ? `جاري الرفع ${state.n > 1 ? `(${state.i}/${state.n}) ` : ""}${state.p}%` : label;

  return (
    <div className="grid gap-1.5">
      <input ref={ref} type="file" accept={accept} multiple={multiple} onChange={pick} className="hidden" />
      <button type="button" disabled={!!state} onClick={() => ref.current?.click()} className={ghost}>
        {text}
      </button>
      {err && <p className="text-xs text-red-400">{err}</p>}
    </div>
  );
}

export function ImageField({ label, value, fallback, onChange }) {
  return (
    <div className="grid gap-2 text-xs font-semibold">
      {label}
      <div className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={value || fallback}
          alt=""
          className="h-20 w-16 rounded-xl border border-brand/20 bg-black/30 object-cover object-top"
        />
        <div className="grid gap-2">
          <Uploader label="رفع صورة جديدة" accept="image/*" onDone={(r) => onChange(r.url)} />
          {value && (
            <button type="button" onClick={() => onChange("")} className={ghost}>
              الرجوع للصورة الأصلية
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// items: array. onChange accepts a new array OR a function (prev) => next.
export function ListEditor({ items, onChange, itemLabel, addLabel, newItem, render }) {
  const move = (i, d) =>
    onChange((prev) => {
      const j = i + d;
      if (j < 0 || j >= prev.length) return prev;
      const a = [...prev];
      [a[i], a[j]] = [a[j], a[i]];
      return a;
    });
  const del = (i) => {
    if (window.confirm("متأكد إنك عايز تحذف العنصر ده؟")) onChange((prev) => prev.filter((_, k) => k !== i));
  };
  const patch = (i, obj) => onChange((prev) => prev.map((x, k) => (k === i ? { ...x, ...obj } : x)));

  return (
    <div className="grid gap-3">
      {(items || []).map((it, i) => (
        <div key={i} className="rounded-2xl border border-brand/15 bg-black/20 p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <span className="text-xs font-bold">{itemLabel} {i + 1}</span>
            <div className="flex gap-1.5">
              <button type="button" aria-label="فوق" onClick={() => move(i, -1)} className={ghost}>▲</button>
              <button type="button" aria-label="تحت" onClick={() => move(i, 1)} className={ghost}>▼</button>
              <button type="button" onClick={() => del(i)} className={`${ghost} text-red-400`}>حذف</button>
            </div>
          </div>
          {render(it, (obj) => patch(i, obj))}
        </div>
      ))}
      {addLabel && (
        <button type="button" onClick={() => onChange((prev) => [...prev, newItem()])} className={ghost}>
          + {addLabel}
        </button>
      )}
    </div>
  );
}
