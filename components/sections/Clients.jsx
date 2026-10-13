import { CLIENTS } from "@/data/content";

export default function Clients() {
  return (
    <section aria-label="العملاء" className="container-x py-10 text-center defer">
      <p className="mb-4 text-[11px] text-white/45">عملاء وثقوا بعملي</p>
      <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-black tracking-wider text-white/55">
        {CLIENTS.map((c) => <li key={c}>{c}</li>)}
      </ul>
    </section>
  );
}
