export const NAV = [
  { href: "#about", label: "نبذة عني" },
  { href: "#works", label: "أعمالي" },
  { href: "#services", label: "الخدمات" },
  { href: "#process", label: "خطوات العمل" },
  { href: "#faq", label: "الأسئلة الشائعة" },
];

export const SKILLS = [
  { icon: "film", label: "مونتاج الفيديو الاحترافي" },
  { icon: "sparkle", label: "موشن جرافيك 2D" },
  { icon: "zap", label: "محتوى سوشيال ميديا سريع" },
  { icon: "palette", label: "تصحيح وتلوين سينمائي" },
];

export const STATS = [
  { value: "150+", label: "مشروع مكتمل" },
  { value: "50+", label: "عميل في الوطن العربي" },
  { value: "2+", label: "سنوات خبرة مستمرة" },
  { value: "100%", label: "نسبة رضا وولاء" },
];

export const CLIENTS = ["BOOST", "PODCAST99", "QUICKMEDIA", "TECHVIBE"];

export const FILTERS = [
  { id: "all", label: "الكل" },
  { id: "reels", label: "ريلز وشورتس" },
  { id: "podcast", label: "بودكاست" },
  { id: "ads", label: "إعلانات تجارية" },
];

export const WORKS = Array.from({ length: 11 }, (_, index) => {
  const id = index + 1;

  return {
    id,
    src: `/videos/${id}.mp4`,
    cover: `/covers/${id}.webp`,
  };
});

export const SERVICES = [
  {
    icon: "film",
    title: "مونتاج الفيديوهات",
    text: "قص دقيق، إيقاع متوازن، وإضافة المؤثرات والانتقالات لتقديم محتوى بصري ممتع يلفت الأنظار.",
  },
  {
    icon: "sparkle",
    title: "موشن جرافيك",
    text: "تحريك الشعارات، أنيميشن وتوضيحات للرسوم البيانية وعناصر الهوية لدعم فكرة الفيديو.",
  },
  {
    icon: "zap",
    title: "ريلز وشورتس الفيرال",
    text: "صيغ عمودية (Reels) وتعليقات تفاعلية وإيقاع سريع لتجنب خروج المشاهد في أول ثوانٍ.",
  },
  {
    icon: "palette",
    title: "تصحيح الألوان السينمائي",
    text: "Color Correction & Grading لإعطاء مشاريعك طابعاً سينمائياً وهوية لونية متناسقة.",
  },
];

export const TOOLS = [
  { short: "Dr", name: "DaVinci Resolve" },
  { short: "Ae", name: "After Effects" },
  { short: "Pr", name: "Premiere Pro" },
  { short: "Au", name: "Adobe Audition" },
  { short: "Cc", name: "CapCut Pro" },
  { short: "Fc", name: "Final Cut Pro" },
];

export const STEPS = [
  {
    title: "استلام المواد والموجز (Brief)",
    text: "إرسال المواد الخام والأفكار الرئيسية أو مراجع الفيديو المطلوب محاكاته.",
  },
  {
    title: "صناعة أول مسودة (Rough Cut)",
    text: "بناء هيكل الفيديو الأولي، تركيب المشاهد، واختيار الموسيقى والمؤثرات.",
  },
  {
    title: "التعديلات والملاحظات",
    text: "مراجعة المسودة وإضافة التعديلات بدقة حتى الوصول لأفضل نتيجة ممكنة.",
  },
  {
    title: "التسليم النهائي بأعلى جودة (4K/FHD)",
    text: "تسليم الملفات بأعلى جودة مع صيغ مناسبة لكل منصة.",
  },
];

export const REVIEWS = [
  {
    initial: "س",
    name: "سالم الشمري",
    role: "صانع محتوى (قناة اليوتيوب)",
    text: "محمد من المونتيرين اللي تعاملت معهم بجد! في فترة قصيرة فهم أسلوب قناتي وغيّر نظام المونتاج وزاد التفاعل بشكل كبير، أنصح بالتعامل معه بشدة.",
  },
  {
    initial: "م",
    name: "مريم الكبير",
    role: "مديرة تسويق، برند (إلكتروني)",
    text: "إبداع حقيقي في الموشن جرافيك والموسيقى. الفيديوهات الإعلانية حققت نتائج قياسية في الحملة الأخيرة، أنصح بالتعامل!",
  },
];

export const FAQS = [
  {
    q: "كم تستغرق مدة تسليم الفيديو؟",
    a: "تعتمد المدة على طول وتعقيد المشروع، لكن ريلز الشورتس عادة تُسلّم خلال 24 إلى 72 ساعة، والمشاريع الأطول خلال 3 إلى 7 أيام.",
  },
  {
    q: "كيف يتم إرسال ملفات الفيديو الخام الضخمة؟",
    a: "عن طريق Google Drive أو WeTransfer أو Dropbox، وسأرسل لك رابط الرفع بعد الاتفاق على تفاصيل المشروع.",
  },
  {
    q: "ماذا لو كان لدي تعديلات على العمل؟",
    a: "التعديلات متاحة بعد تسليم المسودة الأولى حتى ترضى عن النتيجة النهائية، ضمن النطاق المتفق عليه.",
  },
];

export const SOCIALS = [
  { icon: "instagram", label: "Instagram", href: "https://www.instagram.com/edit.gomaa?srtk=NDB6cDl1aTl1eTRs" },
  { icon: "facebook", label: "facebook", href: "https://www.facebook.com/gomaa.abdeltoub?mibextid=ZbWKwL" },
];
