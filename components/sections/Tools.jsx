import SectionHeading from "../ui/SectionHeading";
import { TOOLS } from "@/data/content";

export default function Tools() {
  return (
    <section aria-labelledby="tools-title" className="section container-x defer">
      <SectionHeading id="tools-title" eyebrow="بيئة العمل الاحترافية" title="البرامج والأدوات التي أتقنها" />
      <ul className="mx-auto grid max-w-3xl grid-cols-2 gap-3 md:grid-cols-3">
        {TOOLS.map((t) => (
          <li key={t.name} className="card flex flex-col items-center gap-2 p-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-brand/40 bg-black/40 text-sm font-black text-brand" dir="ltr">{t.short}</span>
            <span className="text-[11px] font-semibold text-white/80" dir="ltr">{t.name}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
