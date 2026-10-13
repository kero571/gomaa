import Icon from "../ui/Icon";
import SectionHeading from "../ui/SectionHeading";
import { REVIEWS } from "@/data/content";

export default function Testimonials() {
  return (
    <section aria-labelledby="reviews-title" className="section container-x defer">
      <SectionHeading id="reviews-title" eyebrow="آراء العملاء" title="ماذا يقول صُنّاع المحتوى؟" />
      <div className="mx-auto grid max-w-4xl gap-3 md:grid-cols-2">
        {REVIEWS.map((r) => (
          <figure key={r.name} className="card p-5">
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand font-black text-black">{r.initial}</span>
              <figcaption>
                <p className="text-sm font-extrabold">{r.name}</p>
                <p className="text-[11px] text-white/50">{r.role}</p>
              </figcaption>
            </div>
            <div className="mb-2 flex gap-0.5 text-brand" aria-label="5 من 5">
              {[0,1,2,3,4].map((i) => <Icon key={i} name="star" className="h-3.5 w-3.5" />)}
            </div>
            <blockquote className="text-xs leading-6 text-white/70">“{r.text}”</blockquote>
          </figure>
        ))}
      </div>
    </section>
  );
}
