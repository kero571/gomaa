"use client";
import { useCallback, useState } from "react";
import Icon from "../ui/Icon";
import SectionHeading from "../ui/SectionHeading";
import VideoModal from "../VideoModal";
import { FILTERS, WORKS } from "@/data/content";

export default function Works() {
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState(null);
  const close = useCallback(() => setActive(null), []);
  const list = filter === "all" ? WORKS : WORKS.filter((w) => w.cat === filter);

  return (
    <section id="works" aria-labelledby="works-title" className="section container-x defer">
      <SectionHeading id="works-title" eyebrow="معرض النماذج" title="أحدث الأعمال (Reels 9:16)" />
      <div role="tablist" aria-label="تصفية الأعمال" className="mb-6 flex flex-wrap justify-center gap-2">
        {FILTERS.map((f) => (
          <button key={f.id} role="tab" aria-selected={filter === f.id} onClick={() => setFilter(f.id)}
            className={`rounded-full border px-4 py-1.5 text-xs font-bold transition ${filter === f.id ? "border-brand bg-brand text-black" : "border-brand/25 bg-white/[0.04] text-white/80 hover:border-brand"}`}>
            {f.label}
          </button>
        ))}
      </div>

      <ul className="mx-auto grid max-w-4xl grid-cols-2 gap-3 md:grid-cols-4">
        {list.map((w) => (
          <li key={w.id}>
            <button onClick={() => setActive(w)} aria-label={`تشغيل: ${w.title}`}
              className="card group block w-full overflow-hidden text-start transition hover:border-brand/60">
              {/* fixed 9:16 box => no layout shift */}
              <div className="relative aspect-[9/16] bg-gradient-to-b from-[#1b0f07] to-black">
                <span className="absolute start-2 top-2 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-bold" dir="ltr">{w.duration}</span>
                <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-black animate-ring transition group-hover:scale-110">
                  <Icon name="play" className="h-5 w-5" />
                </span>
                {w.eq && (
                  <span className="absolute inset-x-0 bottom-3 flex h-5 items-end justify-center gap-1" aria-hidden="true">
                    {[0, 0.2, 0.4, 0.1, 0.3].map((d, i) => (
                      <i key={i} className="block h-full w-1 origin-bottom animate-bar rounded-full bg-brand" style={{ animationDelay: `${d}s` }} />
                    ))}
                  </span>
                )}
              </div>
              <div className="p-3">
                <h3 className="text-xs font-extrabold leading-5">{w.title}</h3>
                <p className="mt-1 flex items-center justify-between text-[10px] text-white/50">
                  <span>{w.meta}</span>
                  <span className="flex items-center gap-1 text-brand"><Icon name="eye" className="h-3 w-3" />{w.views}</span>
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {active && <VideoModal src={active.src} title={active.title} onClose={close} />}
    </section>
  );
}
