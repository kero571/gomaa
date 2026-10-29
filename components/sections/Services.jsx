import Icon from "../ui/Icon";
import SectionHeading from "../ui/SectionHeading";

export default function Services({ services, heading }) {
  return (
    <section id="services" aria-labelledby="services-title" className="section container-x defer">
      <SectionHeading id="services-title" eyebrow={heading.eyebrow} title={heading.title} text={heading.text} />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {(services || []).map((s, i) => (
          <article key={`${s.title}-${i}`} className="card p-5 transition hover:border-brand/50">
            <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand/15 text-brand">
              <Icon name={s.icon} />
            </span>
            <h3 className="mb-2 text-base font-extrabold">{s.title}</h3>
            <p className="text-xs leading-6 text-white/60">{s.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
