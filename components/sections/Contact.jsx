import Icon from "../ui/Icon";

const WHATSAPP_NUMBER = "201159150080";

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    icon: "instagram",
    href: "https://instagram.com/yourusername",
  },
  {
    name: "Facebook",
    icon: "facebook",
    href: "https://facebook.com/yourusername",
  },
  {
    name: "YouTube",
    icon: "youtube",
    href: "https://youtube.com/@yourusername",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    href: "https://linkedin.com/in/yourusername",
  },
];

export default function Contact() {
  const message =
    "السلام عليكم، شفت أعمالك وحابب أتكلم معاك عن مشروع مونتاج فيديو.";

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message,
  )}`;

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="section border-t border-brand/20 bg-gradient-to-b from-brand/10 to-transparent"
    >
      <div className="container-x mx-auto max-w-2xl text-center">
        <p className="eyebrow">خلينا نبدأ مع بعض</p>

        <h2 id="contact-title" className="h2 mx-auto max-w-xl">
          عندك فكرة تستحق إنها تتشاف؟
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-white/60 sm:text-base">
          احكيلي عن مشروعك، وخلينا نحوله لفيديو يخطف الانتباه ويوصل رسالتك.
        </p>

        {/* WhatsApp CTA */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="تواصل معي عبر واتساب"
          className="mx-auto mt-7 inline-flex min-h-14 w-full max-w-sm items-center justify-center gap-3 rounded-2xl bg-[#25D366] px-6 py-4 font-extrabold text-white shadow-lg shadow-[#25D366]/15 transition duration-300 hover:-translate-y-1 hover:bg-[#20bd5a] hover:shadow-xl hover:shadow-[#25D366]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          <Icon name="message-circle" className="h-6 w-6" />
          <span>كلمني على واتساب</span>
          <Icon name="arrow-up-left" className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
