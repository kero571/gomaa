import { Cairo } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-cairo",
});

export const viewport = { width: "device-width", initialScale: 1, themeColor: "#1a0d05" };

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: "%s | محمد أحمد" },
  description: SITE.description,
  keywords: ["مونتاج فيديو", "موشن جرافيك", "مونتير", "ريلز", "شورتس", "تصحيح ألوان", "Video Editor", "Motion Graphics"],
  authors: [{ name: "محمد أحمد" }],
  creator: "محمد أحمد",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  openGraph: { type: "website", locale: "ar_AR", url: SITE.url, siteName: SITE.name, title: SITE.title, description: SITE.description, images: [{ url: "/profile.png", width: 1065, height: 1600, alt: "محمد أحمد" }] },
  twitter: { card: "summary_large_image", title: SITE.title, description: SITE.description, images: ["/profile.png"] },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
