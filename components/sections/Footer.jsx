import Icon from "../ui/Icon";

export default function Footer({ socials, text }) {
  return (
    <footer className="border-t border-brand/10 px-5 py-8 text-center">
      <ul className="mb-4 flex justify-center gap-3">
        {(socials || []).map((s, i) => (
          <li key={`${s.label}-${i}`}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand/20 bg-white/[0.04] text-white/80 transition hover:border-brand hover:text-brand"
            >
              <Icon name={s.icon} className="h-4 w-4" />
            </a>
          </li>
        ))}
      </ul>
      <p className="text-[11px] text-white/45">{text}</p>
    </footer>
  );
}
