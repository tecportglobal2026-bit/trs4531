import { useTranslation } from "@/i18n/LanguageContext";
import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SofiaChat from "@/components/SofiaChat";
import BrochuresSection from "@/components/BrochuresSection";
import HeroSection from "@/components/HeroSection";
import ContactForm from "@/components/ContactForm";
import SectionTitle from "@/components/SectionTitle";

import heroDiesel from "@/assets/diesel/hero/hero-diesel.webp";
import gallery1 from "@/assets/diesel/gallery/1.webp";
import gallery2 from "@/assets/diesel/gallery/2.webp";
import gallery3 from "@/assets/diesel/gallery/3.webp";
import gallery4 from "@/assets/diesel/gallery/4.webp";
import gallery5 from "@/assets/diesel/gallery/5.webp";
import gallery6 from "@/assets/diesel/gallery/6.webp";
import galleryVideo from "@/assets/diesel/gallery/video2.webm";
import canbusImg from "@/assets/diesel/technology/can-bus.webp";
import contactImg from "@/assets/diesel/contact/trs4531-diesel-sinfondo.webp";
import portIndustrial from "@/assets/port-panorama.webp";
import TablaCargaModal from "../components/TablaCargaModal";
import FeaturesSection from "@/components/FeaturesSection";
import SpecificationsSection from "@/components/SpecificationsSection";
import TechnologySection from "@/components/TechnologySection";
import GallerySection from "@/components/GallerySection";
import tablaCargaImg from "@/assets/electrica/gallery/tabla-carga-dv.webp";


// Map de brochures por idioma
const BROCHURES = {
  technical: {
    es: "/diesel/brochures/TRS4531_Tecnico_ES.pdf",
    en: "/diesel/brochures/TRS4531_Technical_EN.pdf",
    pt: "/diesel/brochures/TRS4531_Tecnico_PT.pdf",
  },
  commercial: {
    es: "/diesel/brochures/TRS4531_Comercial_ES.pdf",
    en: "/diesel/brochures/TRS4531_Commercial_EN.pdf",
    pt: "/diesel/brochures/TRS4531_Comercial_PT.pdf",
  },
} as const;

const DieselPage = () => {
  const { t, lang } = useTranslation();
  const [tablaCargaOpen, setTablaCargaOpen] = useState(false);

  const d = t.diesel;
  const features = d.features;

  // galleryImages: array de objetos { src, alt }
  const galleryImages = useMemo(
    () => [
      { src: gallery1, alt: "Galería 1" },
      { src: gallery2, alt: "Galería 2" },
      { src: gallery3, alt: "Galería 3" },
      { src: gallery4, alt: "Galería 4" },
      { src: gallery5, alt: "Galería 5" },
      { src: gallery6, alt: "Galería 6" }
    ],
    []
  );

  return (
    <div>
      <Header />

      {/* Hero */}
      <HeroSection
        backgroundImage={heroDiesel}
        title={d.hero}
        subtitle={d.heroSub}
        featuresLabel={t.nav.features}
        brochuresLabel={"Brochures"}
      />

      {/* Features */}
      <FeaturesSection
        features={features}
        featuresTitle={d.features_title}
      />

      {/* Technology */}
      <TechnologySection
        tech={d.tech}
        techTitle={d.tech_title}
        techImg={canbusImg}
        techImgAlt="Imagen CANBUS"
      />

      {/* Specifications */}
      <SpecificationsSection
        specs={d.specs}
        specKeys={Object.keys(d.specs)}
        title={d.specs_title}
      />

      {/* Brochures */}
      <BrochuresSection
        brochures={BROCHURES}
        backgroundImage={portIndustrial}
        translations={{
          title: d.brochures_title,
          technical: d.technical,
          commercial: d.commercial,
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
        variant="Diesel"
      />

      {/* Gallery */}
      <GallerySection
        galleryImages={galleryImages}
        tablaCargaImg={tablaCargaImg}
        galleryTitle={d.gallery_title}
        lang={lang}
        video={{
          src: galleryVideo,
          videoLabel: d.gallery_video_label,
          photosLabel: d.gallery_photos_label,
        }}
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
            <ContactForm lang={lang} variant="diesel" t={t} />
          </div>
        </div>
      </section>

      <TablaCargaModal
        open={tablaCargaOpen}
        onClose={() => setTablaCargaOpen(false)}
        imgSrc={tablaCargaImg}
        imgAlt="Tabla de Carga TRS4531"
      />

      <Footer />
      <SofiaChat variant="diesel" />
    </div>
  );
};

export default DieselPage;
