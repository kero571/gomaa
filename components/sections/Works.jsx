"use client";

import { useState } from "react";
import Icon from "../ui/Icon";
import SectionHeading from "../ui/SectionHeading";

export default function Works({ works, link, heading }) {
  // id الفيديو الشغال حاليًا (واحد بس في نفس الوقت)
  const [activeId, setActiveId] = useState(null);

  return (
    <section id="works" aria-labelledby="works-title" className="section container-x defer">
      <SectionHeading id="works-title" eyebrow={heading.eyebrow} title={heading.title} />

      <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {(works || []).map((work, index) => {
          const isPlaying = activeId === work.id;

          return (
            <li key={work.id}>
              <div className="card group relative block w-full overflow-hidden transition hover:border-brand/60">
                <div className="relative aspect-[9/16] overflow-hidden bg-black">
                  {isPlaying ? (
                    <video
                      src={work.src}
                      poster={work.cover || undefined}
                      controls
                      autoPlay
                      playsInline
                      preload="metadata"
                      onEnded={() => setActiveId(null)}
                      className="absolute inset-0 h-full w-full bg-black object-cover"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveId(work.id)}
                      aria-label={`تشغيل الفيديو ${index + 1}`}
                      className="absolute inset-0 block h-full w-full text-start"
                    >
                      {work.cover && (
                        <img
                          src={work.cover}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      )}

                      <span className="absolute inset-0 bg-black/15 transition-colors group-hover:bg-black/30" />

                      <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-black shadow-lg transition-transform group-hover:scale-110">
                        <Icon name="play" className="h-5 w-5" />
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {link && (
        <div className="mt-8 flex justify-center md:mt-10">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full max-w-xs items-center justify-center gap-3 rounded-full border border-brand/40 bg-brand/10 px-7 py-3.5 text-center font-bold text-brand shadow-lg shadow-brand/10 transition-all duration-300 hover:-translate-y-1 hover:bg-brand hover:text-black hover:shadow-brand/25 sm:w-auto"
          >
            <Icon name="folder-open" className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
            <span>{heading.button}</span>
            <Icon name="external-link" className="h-4 w-4 shrink-0 opacity-70" />
          </a>
        </div>
      )}
    </section>
  );
}
