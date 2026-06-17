import { useTranslation } from "@/i18n/LanguageContext";
import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SofiaChat from "@/components/SofiaChat";
import BrochuresSection from "@/components/BrochuresSection";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import TechnologySection from "@/components/TechnologySection";
import SpecificationsSection from "@/components/SpecificationsSection";
import GallerySection from "@/components/GallerySection";
import ContactForm from "@/components/ContactForm";
import contactImg from "@/assets/electrica/contact/trs4531-electric-sinfondo.webp";
import heroElectric from "@/assets/electrica/hero/hero-electric.webp";
import portIndustrial from "@/assets/port-panorama.webp";

import techImg from "@/assets/electrica/technology/can-bus.webp";
import gallery1 from "@/assets/electrica/gallery/1.webp";
import gallery2 from "@/assets/electrica/gallery/2.webp";
import gallery3 from "@/assets/electrica/gallery/3.webp";
import gallery4 from "@/assets/electrica/gallery/4.webp";
import gallery5 from "@/assets/electrica/gallery/5.webp";
import gallery6 from "@/assets/electrica/gallery/6.webp";
import tablaCargaImg from "@/assets/diesel/gallery/tabla-carga-ev.webp";
import SectionTitle from "@/components/SectionTitle";

const BROCHURES = {
  technical: {
    es: "/electric/brochures/TRS4531_EV_Tecnico_ES.pdf",
    en: "/electric/brochures/TRS4531_EV_Tecnico_EN.pdf",
    pt: "/electric/brochures/TRS4531_EV_Tecnico_PT.pdf",
  },
  commercial: {
    es: "/electric/brochures/TRS4531_EV_Comercial_ES.pdf",
    en: "/electric/brochures/TRS4531_EV_Comercial_EN.pdf",
    pt: "/electric/brochures/TRS4531_EV_Comercial_PT.pdf",
  },
} as const;


const ElectricPage = () => {
  const { t, lang } = useTranslation();
  const e = t.electric;
  const features = e.features;

  const galleryImages = useMemo(
    () => [
      { src: gallery1, alt: "Galería 1" },
      { src: gallery2, alt: "Galería 2" },
      { src: gallery3, alt: "Galería 3" },
      { src: gallery4, alt: "Galería 4" },
      { src: gallery5, alt: "Galería 5" },
      { src: gallery6, alt: "Galería 6" },
    ],
    []
  );
  const specKeys = Object.keys(e.specs) as string[];

  return (
    <div>
      <Header />

      {/* Hero */}
      <HeroSection
        backgroundImage={heroElectric}
        title={e.hero}
        subtitle={e.heroSub}
        featuresLabel={t.nav.features}
        brochuresLabel={t.diesel?.brochures_title || "Brochures"}
      />

      {/* Features */}
      <FeaturesSection
        features={features}
        featuresTitle={e.features_title}
      />

      {/* Technology */}
      <TechnologySection
        tech={e.tech}
        techTitle={e.tech_title}
        techImg={techImg}
        techImgAlt="Electric Technology"
      />

      {/* Specifications */}
      <SpecificationsSection
        specs={e.specs}
        specKeys={specKeys}
        title={e.specs_title}
      />

      {/* Brochures */}
      <BrochuresSection
        brochures={BROCHURES}
        backgroundImage={portIndustrial}
        translations={{
          title: e.brochures_title,
          technical: e.technical,
          commercial: e.commercial,
          modalTitle: t.brochureModal.title,
          modalSubtitle: t.brochureModal.subtitle,
          name: t.contact.name,
          lastName: t.contact.lastName,
          email: t.contact.email,
          phone: t.contact.phone,
          terms: t.contact.terms,
          download: t.brochureModal.download,
          downloading: t.brochureModal.downloading,
        }}
        lang={lang}
        product="TRS4531"
        variant="Electric"
      />

      {/* Gallery */}
      <GallerySection
        galleryImages={galleryImages}
        tablaCargaImg={tablaCargaImg}
        galleryTitle={e.gallery_title}
        lang={lang}
      />



      {/* Contact */}
      <section id="contact" className="scroll-mt-24 py-8 px-4 md:px-12 bg-background">
        <SectionTitle
          title={t.nav.contact.toUpperCase()}
          subtitle={t.contact?.subtitle || "Estamos presentes en todo el mundo y listos para atenderle."}
        />
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={contactImg}
              alt="contact"
              className="max-w-full h-auto rounded-lg shadow-md"
              style={{ minWidth: 260, maxWidth: 480 }}
            />
          </div>
          <div className="w-full md:w-1/2">
            <ContactForm lang={lang} variant="electric" t={t} />
          </div>
        </div>
      </section>

      <Footer />
      <SofiaChat variant="electric" />
    </div>
  );
};

export default ElectricPage;
