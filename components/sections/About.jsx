import Image from "next/image";
import Icon from "../ui/Icon";
import SectionHeading from "../ui/SectionHeading";
import { SKILLS } from "@/data/content";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section container-x defer">
      <SectionHeading id="about-title" title="نبذة عني وخبراتي" />
      <div className="card mx-auto flex max-w-3xl items-start gap-4 p-5">
        <Image src="/profile.png" alt="" width={56} height={56} className="h-14 w-14 shrink-0 rounded-full border-2 border-brand object-cover object-top" />
        <p className="text-sm leading-7 text-white/75">
          مرحباً أنا <strong className="text-brand">جمعه</strong>، مونتير ومصمم موشن جرافيك بخبرة تفوق 4 سنوات في تحويل المشاهد الخام إلى قصص مرئية قوية تزيد من بقاء المشاهد وتضاعف التفاعل، مع التركيز على جودة المحتوى والبرامج.
        </p>
      </div>
      <ul className="mx-auto mt-5 flex max-w-3xl flex-wrap justify-center gap-2">
        {SKILLS.map((s) => (
          <li key={s.label} className="chip"><Icon name={s.icon} className="h-3.5 w-3.5 text-brand" />{s.label}</li>
        ))}
      </ul>
    </section>
  );
}
