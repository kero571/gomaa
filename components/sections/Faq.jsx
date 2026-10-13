import Icon from "../ui/Icon";
import SectionHeading from "../ui/SectionHeading";
import { FAQS } from "@/data/content";

// Native <details>: accessible, no JS.
export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section container-x defer">
      <SectionHeading id="faq-title" eyebrow="إجابات سريعة" title="الأسئلة الشائعة" />
      <div className="mx-auto grid max-w-3xl gap-3">
        {FAQS.map((f) => (
          <details key={f.q} className="card group p-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold [&::-webkit-details-marker]:hidden">
              {f.q}
              <Icon name="chevron" className="h-4 w-4 shrink-0 text-brand transition group-open:rotate-180" />
            </summary>
            <p className="mt-3 text-xs leading-6 text-white/65">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
