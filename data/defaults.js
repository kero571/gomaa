import { SKILLS, STATS, WORKS, SERVICES, STEPS, FAQS, SOCIALS } from "./content";

// Used when nothing is saved yet (or Firestore is unreachable).
export const DEFAULT_CONTENT = {
  brand: "GOMAA",
  hero: {
    badge: "Video Editor | Motion Graphics",
    title1: "اصنع فيديوهات تجعل",
    title2: "جمهورك يتوقف عن التمرير",
    text: "مونتاج احترافي وموشن جرافيك سينمائي لبناء هوية بصرية قوية وزيادة تفاعل حساباتك وصفحاتك.",
    primaryBtn: "شاهد أعمالي",
    secondaryBtn: "تواصل معي",
    image: "",
  },
  about: {
    title: "نبذة عني وخبراتي",
    intro: "مرحباً أنا",
    name: "جمعة",
    text: "، مونتير ومصمم موشن جرافيك بخبرة تفوق 2 سنوات في تحويل المشاهد الخام إلى قصص مرئية قوية تزيد من بقاء المشاهد وتضاعف التفاعل، مع التركيز على جودة المحتوى والبرامج.",
    image: "",
  },
  skills: SKILLS,
  stats: STATS,
  works: WORKS,
  worksLink: "https://drive.google.com/drive/folders/1-AnO8eS0Mnx1lwm4R6Jrb5eT5jBVY0s4",
  services: SERVICES,
  steps: STEPS,
  faqs: FAQS,
  sections: {
    works: { eyebrow: "معرض النماذج", title: "أحدث الأعمال", button: "شاهد الأعمال كاملة" },
    services: {
      eyebrow: "ماذا أقدم لك؟",
      title: "خدمات ترتقي بجودة محتواك",
      text: "حلول متكاملة لضمان ظهور مشاهداتك بأعلى جودة ممكنة",
    },
    process: { eyebrow: "رحلة العمل", title: "الخطوات التي نسير عليها" },
    faq: { eyebrow: "إجابات سريعة", title: "الأسئلة الشائعة" },
  },
  contact: {
    eyebrow: "خلينا نبدأ مع بعض",
    title: "عندك فكرة تستحق إنها تتشاف؟",
    text: "احكيلي عن مشروعك، وخلينا نحوله لفيديو يخطف الانتباه ويوصل رسالتك.",
    button: "كلمني على واتساب",
    whatsapp: "201159150080",
    message: "السلام عليكم، شفت أعمالك وحابب أتكلم معاك عن مشروع مونتاج فيديو.",
  },
  socials: SOCIALS,
  footerText: "جميع الحقوق محفوظة © 2026 جمعة للمونتاج والموشن جرافيك.",
};
