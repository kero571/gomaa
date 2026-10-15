"use client";

import { useCallback, useState } from "react";
import Icon from "../ui/Icon";
import SectionHeading from "../ui/SectionHeading";
import VideoModal from "../VideoModal";
import { WORKS } from "@/data/content";

export default function Works() {
  const [active, setActive] = useState(null);

  const close = useCallback(() => setActive(null), []);

  return (
    <section
      id="works"
      aria-labelledby="works-title"
      className="section container-x defer"
    >
      <SectionHeading
        id="works-title"
        eyebrow="معرض النماذج"
        title="أحدث الأعمال"
      />

      <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {WORKS.map((work) => (
          <li key={work.id}>
            <button
              type="button"
              onClick={() => setActive(work)}
              aria-label={`تشغيل الفيديو ${work.id}`}
              className="card group block w-full overflow-hidden text-start transition hover:border-brand/60"
            >
              <div className="relative aspect-[9/16] overflow-hidden bg-black">
                <img
                  src={work.cover}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <span className="absolute inset-0 bg-black/15 transition-colors group-hover:bg-black/30" />

                <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-black shadow-lg transition-transform group-hover:scale-110">
                  <Icon name="play" className="h-5 w-5" />
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex justify-center md:mt-10">
        <a
          href="https://drive.google.com/drive/folders/1QVnohJsKewipA0GUTsCUIAm8u4iXKeqT"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex w-full max-w-xs items-center justify-center gap-3 rounded-full border border-brand/40 bg-brand/10 px-7 py-3.5 text-center font-bold text-brand shadow-lg shadow-brand/10 transition-all duration-300 hover:-translate-y-1 hover:bg-brand hover:text-black hover:shadow-brand/25 sm:w-auto"
        >
          <Icon
            name="folder-open"
            className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110"
          />
          <span>شاهد الأعمال كاملة</span>
          <Icon name="external-link" className="h-4 w-4 shrink-0 opacity-70" />
        </a>
      </div>
      {active && (
        <VideoModal
          src={active.src}
          title={`الفيديو ${active.id}`}
          onClose={close}
        />
      )}
    </section>
  );
}
