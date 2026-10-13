export default function SectionHeading({ eyebrow, title, text, id }) {
  return (
    <div className="mb-8 text-center md:mb-12">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id} className="h2">{title}</h2>
      {text && <p className="mx-auto mt-3 max-w-xl text-sm text-white/60">{text}</p>}
    </div>
  );
}
