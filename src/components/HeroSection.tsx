import { ReactNode } from "react";
import { ArrowRight, Download } from "lucide-react";

interface HeroSectionProps {
  backgroundImage: string;
  title: ReactNode;
  subtitle: ReactNode;
  featuresLabel: string;
  brochuresLabel: string;
}

/**
 * HeroSection: Muestra el hero principal de la página, con título, subtítulo y botones de navegación/descarga.
 * Es reutilizable para variantes diesel y eléctrica.
 */
const HeroSection = ({
  backgroundImage,
  title,
  subtitle,
  featuresLabel,
  brochuresLabel,
}: HeroSectionProps) => {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center -mt-20 pt-20"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay oscuro para mejorar legibilidad */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="container relative z-10">
        <h1 className="max-w-3xl font-titles text-4xl font-extrabold text-primary-foreground md:text-6xl">
          {title}
        </h1>
        <p className="mt-4 max-w-xl text-lg text-primary-foreground/80">
          {subtitle}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#features"
            className="inline-flex items-center gap-2 bg-accent px-8 py-3 font-titles text-sm font-bold uppercase text-accent-foreground transition-opacity hover:opacity-90"
          >
            {featuresLabel}
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#brochures"
            className="inline-flex items-center gap-2 border-2 border-primary-foreground bg-transparent px-8 py-3 font-titles text-sm font-bold uppercase text-primary-foreground transition-all hover:bg-primary-foreground hover:text-primary"
          >
            <Download className="h-4 w-4" />
            {brochuresLabel}
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
