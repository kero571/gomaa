import Icon from "../ui/Icon";

export default function Contact({ contact }) {
  const number = String(contact.whatsapp || "").replace(/\D/g, "");
  const whatsappUrl = `https://wa.me/${number}?text=${encodeURIComponent(contact.message || "")}`;

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="section border-t border-brand/20 bg-gradient-to-b from-brand/10 to-transparent"
    >
      <div className="container-x mx-auto max-w-2xl text-center">
        <p className="eyebrow">{contact.eyebrow}</p>

        <h2 id="contact-title" className="h2 mx-auto max-w-xl">
          {contact.title}
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-white/60 sm:text-base">{contact.text}</p>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="تواصل معي عبر واتساب"
          className="mx-auto mt-7 inline-flex min-h-14 w-full max-w-sm items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 py-4 font-extrabold text-white shadow-lg shadow-[#25D366]/15 transition duration-300 hover:-translate-y-1 hover:bg-[#20bd5a] hover:shadow-xl hover:shadow-[#25D366]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          <Icon name="message-circle" className="h-6 w-6" />
          <span>{contact.button}</span>
          <Icon name="arrow-up-left" className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
