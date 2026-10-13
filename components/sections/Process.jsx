import SectionHeading from "../ui/SectionHeading";
import { STEPS } from "@/data/content";

export default function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="section container-x defer">
      <SectionHeading id="process-title" eyebrow="رحلة العمل" title="الخطوات التي نسير عليها" />
      <ol className="mx-auto grid max-w-3xl gap-3">
        {STEPS.map((s, i) => (
          <li key={s.title} className="card flex items-start gap-4 p-5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-black text-black">{i + 1}</span>
            <div>
              <h3 className="mb-1 text-sm font-extrabold">{s.title}</h3>
              <p className="text-xs leading-6 text-white/60">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
