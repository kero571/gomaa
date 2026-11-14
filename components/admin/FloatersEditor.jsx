"use client";
import { useRef, useState } from "react";
import { Group, Uploader, ghost } from "./ui";

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const r1 = (v) => Math.round(v * 10) / 10;
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

// Upload small images and drag them around the hero photo. x/y/size are % of the photo box.
export default function FloatersEditor({ hero, set }) {
  const items = hero.floaters || [];
  const photo = hero.image || "/profile-Photoroom.png";
  const box = useRef(null);
  const drag = useRef(null);
  const [sel, setSel] = useState(null);
  const cur = items.find((f) => f.id === sel);

  const setItems = (fn) => set("hero", (p) => ({ ...p, floaters: fn(p.floaters || []) }));
  const patch = (id, obj) => setItems((a) => a.map((f) => (f.id === id ? { ...f, ...obj } : f)));
  const remove = (id) => { setItems((a) => a.filter((f) => f.id !== id)); setSel(null); };

  const down = (e, id) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = id;
    setSel(id);
  };
  const move = (e) => {
    if (!drag.current || !box.current) return;
    const r = box.current.getBoundingClientRect();
    patch(drag.current, {
      x: r1(clamp(((e.clientX - r.left) / r.width) * 100, -15, 115)),
      y: r1(clamp(((e.clientY - r.top) / r.height) * 100, -10, 110)),
    });
  };
  const up = () => { drag.current = null; };

  return (
    <Group title="صور حوالين الصورة">
      <Uploader
        label="+ رفع صور (تقدر تختار أكتر من واحدة)"
        accept="image/*"
        multiple
        onDone={(r) =>
          setItems((a) => [...a, { id: uid(), src: r.url, x: 20 + (a.length % 5) * 15, y: 20 + (a.length % 5) * 12, size: 16, float: true }])
        }
      />
      <p className="text-[11px] text-white/50">
        الأفضل صور PNG أو WebP بخلفية شفافة وحجمها صغير. اسحب كل صورة على المعاينة للمكان اللي عايزه، وبعدين اضغط "حفظ ونشر".
      </p>

      <div className="mx-auto w-full max-w-[380px] px-8 py-6">
        <div ref={box} className="relative aspect-[1065/1600] w-full rounded-2xl border border-brand/20 bg-black/30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo} alt="" draggable={false} className="pointer-events-none absolute inset-0 h-full w-full rounded-2xl object-contain" />
          {items.map((f) => (
            <span
              key={f.id}
              onPointerDown={(e) => down(e, f.id)}
              onPointerMove={move}
              onPointerUp={up}
              onPointerCancel={up}
              className={`absolute cursor-grab touch-none active:cursor-grabbing ${sel === f.id ? "outline outline-2 outline-offset-2 outline-brand" : ""}`}
              style={{ left: `${f.x}%`, top: `${f.y}%`, width: `${f.size}%`, transform: "translate(-50%, -50%)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.src} alt="" draggable={false} className="pointer-events-none block h-auto w-full select-none" />
            </span>
          ))}
        </div>
      </div>

      {items.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {items.map((f, i) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setSel(f.id)}
              aria-label={`صورة ${i + 1}`}
              className={`flex h-12 w-12 items-center justify-center rounded-xl border bg-black/30 p-1 ${sel === f.id ? "border-brand" : "border-brand/20"}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.src} alt="" className="max-h-full max-w-full object-contain" />
            </button>
          ))}
        </div>
      )}

      {cur ? (
        <div className="grid gap-3 rounded-2xl border border-brand/15 bg-black/20 p-4">
          <label className="grid gap-1.5 text-xs font-semibold">
            الحجم ({cur.size}%)
            <input type="range" min="4" max="50" step="1" value={cur.size} onChange={(e) => patch(cur.id, { size: Number(e.target.value) })} />
          </label>
          <label className="flex items-center gap-2 text-xs font-semibold">
            <input type="checkbox" checked={!!cur.float} onChange={(e) => patch(cur.id, { float: e.target.checked })} />
            حركة طفو خفيفة
          </label>
          <button type="button" className={`${ghost} w-fit text-red-400`} onClick={() => window.confirm("حذف الصورة دي؟") && remove(cur.id)}>
            حذف الصورة
          </button>
        </div>
      ) : (
        items.length > 0 && <p className="text-[11px] text-white/50">اضغط على صورة عشان تتحكم في حجمها أو تحذفها.</p>
      )}
    </Group>
  );
}
