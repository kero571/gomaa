import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Stats from "@/components/sections/Stats";
import Works from "@/components/sections/Works";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { SITE } from "@/lib/site";
import { getContent } from "@/lib/content";

export default async function Home() {
  const c = await getContent();

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
      mainEntity: (c.faqs || []).map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <>
      <Navbar brand={c.brand} />
      <main>
        <Hero hero={c.hero} />
        <About about={c.about} skills={c.skills} />
        <Stats stats={c.stats} />
        <Works works={c.works} link={c.worksLink} heading={c.sections.works} />
        <Services services={c.services} heading={c.sections.services} />
        <Process steps={c.steps} heading={c.sections.process} />
        <Faq faqs={c.faqs} heading={c.sections.faq} />
        <Contact contact={c.contact} />
      </main>
      <Footer socials={c.socials} text={c.footerText} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
