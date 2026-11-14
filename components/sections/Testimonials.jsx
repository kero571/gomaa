"use client";
import { useEffect, useRef, useState } from "react";
import Icon from "../ui/Icon";
import SectionHeading from "../ui/SectionHeading";
import ReviewForm from "../ReviewForm";
import { fetchReviews } from "@/lib/reviews";

const DEF = { eyebrow: "آراء العملاء", title: "ماذا يقول صُنّاع المحتوى؟", formTitle: "شاركنا رأيك", formOpen: true };

function Card({ r }) {
  return (
    <figure className="card h-full p-5">
      <div className="mb-3 flex items-center gap-3">
        {r.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={r.avatar} alt="" width="40" height="40" loading="lazy" decoding="async" className="h-10 w-10 rounded-full object-cover" />
        ) : (
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand font-black text-black">{(r.name || "?").trim().charAt(0)}</span>
        )}
        <figcaption>
          <p className="text-sm font-extrabold">{r.name}</p>
          {r.role && <p className="text-[11px] text-white/50">{r.role}</p>}
        </figcaption>
      </div>
      <div className="mb-2 flex gap-0.5" aria-label={`${r.rating} من 5`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Icon key={i} name="star" className={`h-3.5 w-3.5 ${i <= r.rating ? "text-brand" : "text-white/15"}`} />
        ))}
      </div>
      {r.text && <blockquote className="whitespace-pre-line text-xs leading-6 text-white/70">“{r.text}”</blockquote>}
      {r.image && (
        <a href={r.image} target="_blank" rel="noopener noreferrer" className="mt-3 block overflow-hidden rounded-xl bg-black/30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={r.image} alt={`رأي من ${r.name}`} loading="lazy" decoding="async" className="max-h-72 w-full object-contain" />
        </a>
      )}
    </figure>
  );
}

const Chevron = ({ flip }) => (
  <svg viewBox="0 0 24 24" className={`h-4 w-4 fill-none stroke-current ${flip ? "rotate-180" : ""}`} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 6l6 6-6 6" />
  </svg>
);

export default function Testimonials({ heading }) {
  const h = { ...DEF, ...(heading || {}) };
  const sec = useRef(null);
  const track = useRef(null);
  const [items, setItems] = useState(null);
  const [failed, setFailed] = useState(false);

  // Reviews load only when the section is about to be seen (saves Firestore reads).
  useEffect(() => {
    const el = sec.current;
    if (!el) return;
    let started = false;
    const load = () => {
      if (started) return;
      started = true;
      fetchReviews().then(setItems).catch(() => { setFailed(true); setItems([]); });
    };
    if (!("IntersectionObserver" in window)) return load();
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { load(); io.disconnect(); } }, { rootMargin: "400px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const add = (r) => {
    setItems((p) => [r, ...(p || [])]);
    track.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

  // dir = 1 → next card in reading direction (works for RTL and LTR)
  const go = (dir) => {
    const el = track.current;
    if (!el) return;
    const rtl = getComputedStyle(el).direction === "rtl";
    el.scrollBy({ left: (rtl ? -1 : 1) * dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section id="reviews" ref={sec} aria-labelledby="reviews-title" className="section container-x defer">
      <SectionHeading id="reviews-title" eyebrow={h.eyebrow} title={h.title} />

      {items === null ? (
        <div className="mx-auto flex max-w-4xl gap-3" aria-hidden="true">
          <div className="card h-32 w-full animate-pulse sm:w-1/2" />
          <div className="card hidden h-32 w-1/2 animate-pulse sm:block" />
        </div>
      ) : items.length === 0 ? (
        <p className="text-center text-sm text-white/60">{failed ? "تعذر تحميل الآراء حالياً." : "كن أول من يشاركنا رأيه."}</p>
      ) : (
        <>
          <div
            ref={track}
            className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="region"
            aria-label="آراء العملاء"
            tabIndex={0}
          >
            {items.map((r) => (
              <div key={r.id} className="w-[85%] shrink-0 snap-start sm:w-[calc(50%-0.375rem)] lg:w-[calc(33.333%-0.5rem)]">
                <Card r={r} />
              </div>
            ))}
          </div>
          {items.length > 1 && (
            <div className="mt-4 flex justify-center gap-2">
              <button type="button" onClick={() => go(-1)} aria-label="السابق" className="flex h-9 w-9 items-center justify-center rounded-full border border-brand/30 bg-white/[0.06] transition hover:border-brand">
                <Chevron flip />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="التالي" className="flex h-9 w-9 items-center justify-center rounded-full border border-brand/30 bg-white/[0.06] transition hover:border-brand">
                <Chevron />
              </button>
            </div>
          )}
        </>
      )}

      {h.formOpen !== false && <ReviewForm title={h.formTitle} onAdded={add} />}
    </section>
  );
}
