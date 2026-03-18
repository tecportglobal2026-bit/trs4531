import { Link } from "react-router-dom";
import { useTranslation } from "@/i18n/LanguageContext";
import dieselImg from "@/assets/trs4531-diesel.png";
import electricImg from "@/assets/trs4531-electric.png";
import { ArrowRight } from "lucide-react";

const HomeSelector = () => {
  const { t, lang, setLang } = useTranslation();
  const languages = ["es", "en", "pt"] as const;

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      {/* Top bar with lang selector */}
      <div className="absolute right-6 top-6 z-20 flex items-center gap-1">
        {languages.map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`px-2 py-1 text-xs font-semibold uppercase transition-colors ${
              lang === l ? "text-accent" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Center title overlay */}
      <div className="pointer-events-none absolute inset-x-0 top-[10%] z-10 text-center">
        <h1 className="font-titles text-4xl font-bold text-primary md:text-5xl">
          {t.selector.title}
        </h1>
        <p className="mt-2 text-sm uppercase tracking-[0.2em] text-muted-foreground">
          {t.selector.subtitle}
        </p>
      </div>

      {/* Split container */}
      <div className="grayscale-container flex flex-1">
        {/* Diesel Side */}
        <Link
          to="/trs4531-diesel"
          className="grayscale-side group relative flex flex-1 items-center justify-center overflow-hidden bg-secondary"
        >
          <img
            src={dieselImg}
            alt="TRS4531 Diesel"
            className="absolute inset-0 h-full w-full object-contain object-center p-8"
          />
          <div className="absolute inset-0 bg-foreground/5" />
          <div className="relative z-10 flex flex-col items-center gap-4 text-center">
            <h2 className="font-titles text-5xl font-extrabold text-primary md:text-6xl">
              {t.selector.diesel}
            </h2>
            <span className="inline-flex items-center gap-2 bg-primary px-8 py-3 font-titles text-sm font-bold uppercase text-primary-foreground transition-colors group-hover:bg-accent">
              {t.selector.enter}
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </Link>

        {/* Electric Side */}
        <Link
          to="/trs4531-electric"
          className="grayscale-side group relative flex flex-1 items-center justify-center overflow-hidden bg-secondary"
        >
          <img
            src={electricImg}
            alt="TRS4531 Electric"
            className="absolute inset-0 h-full w-full object-contain object-center p-8"
          />
          <div className="absolute inset-0 bg-foreground/5" />
          <div className="relative z-10 flex flex-col items-center gap-4 text-center">
            <h2 className="font-titles text-5xl font-extrabold text-primary md:text-6xl">
              {t.selector.electric}
            </h2>
            <span className="inline-flex items-center gap-2 bg-primary px-8 py-3 font-titles text-sm font-bold uppercase text-primary-foreground transition-colors group-hover:bg-accent">
              {t.selector.enter}
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomeSelector;
