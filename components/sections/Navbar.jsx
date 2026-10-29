import Icon from "../ui/Icon";
import { NAV } from "@/data/content";

// Pure-CSS mobile menu (checkbox hack) => zero JS, zero INP cost.
export default function Navbar({ brand = "GOMAA" }) {
  return (
    <header className="sticky top-0 z-40 border-b border-brand/10 bg-bg/85 backdrop-blur">
      <div className="container-x relative flex h-14 items-center justify-between">
        <label
          htmlFor="menu-toggle"
          className="cursor-pointer rounded-lg border border-brand/20 p-2 md:hidden"
          aria-label="القائمة"
        >
          <Icon name="menu" className="h-4 w-4" />
        </label>
        <a
          href="#contact"
          className="rounded-lg border border-brand/30 bg-white/[0.05] px-4 py-1.5 text-xs font-bold hover:border-brand"
        >
          تواصل معي
        </a>

        <input id="menu-toggle" type="checkbox" className="peer sr-only" />
        <nav
          aria-label="التنقل الرئيسي"
          className="absolute inset-x-0 top-14 hidden flex-col gap-1 border-b border-brand/10 bg-bg p-4 peer-checked:flex md:static md:flex md:flex-row md:border-0 md:bg-transparent md:p-0"
        >
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-lg px-3 py-2 text-sm text-white/80 hover:text-brand"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a href="#top" className="hidden font-extrabold md:block text-brand text-lg">
          {brand}
        </a>
      </div>
    </header>
  );
}
