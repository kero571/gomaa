import Icon from "../ui/Icon";
import SectionHeading from "../ui/SectionHeading";
import { SERVICES } from "@/data/content";

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="section container-x defer">
      <SectionHeading id="services-title" eyebrow="ماذا أقدم لك؟" title="خدمات ترتقي بجودة محتواك" text="حلول متكاملة لضمان ظهور مشاهداتك بأعلى جودة ممكنة" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((s) => (
          <article key={s.title} className="card p-5 transition hover:border-brand/50">
            <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand/15 text-brand"><Icon name={s.icon} /></span>
            <h3 className="mb-2 text-base font-extrabold">{s.title}</h3>
            <p className="text-xs leading-6 text-white/60">{s.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
