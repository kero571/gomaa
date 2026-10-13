import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Stats from "@/components/sections/Stats";
import Clients from "@/components/sections/Clients";
import Works from "@/components/sections/Works";
import Services from "@/components/sections/Services";
import Tools from "@/components/sections/Tools";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { SITE } from "@/lib/site";
import { FAQS } from "@/data/content";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "محمد أحمد",
    jobTitle: "Video Editor & Motion Graphics Designer",
    url: SITE.url,
    image: `${SITE.url}/profile.png`,
    email: SITE.email,
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE.name,
    url: SITE.url,
    image: `${SITE.url}/profile.png`,
    description: SITE.description,
    areaServed: "Middle East",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stats />
        <Clients />
        <Works />
        <Services />
        <Tools />
        <Process />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
