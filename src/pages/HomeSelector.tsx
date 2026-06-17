import { Link } from "react-router-dom";
import { useTranslation } from "@/i18n/LanguageContext";
import dieselImg from "@/assets/selector/trs4531-diesel.webp";
import electricImg from "@/assets/selector/trs4531-electric.webp";
import tecportLogo from "@/assets/tecport-logo.webp";

type Language = "es" | "en" | "pt";

const LANGUAGES: Language[] = ["es", "en", "pt"];

interface SelectorPanelProps {
  to: string;
  image: string;
  label: string;
  enterLabel: string;
}

const SelectorPanel = ({ to, image, label, enterLabel }: SelectorPanelProps) => (
  <Link
    to={to}
    className="grayscale-side relative flex flex-1 items-start justify-start overflow-hidden bg-secondary"
    style={{
      backgroundImage: `url(${image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/30 to-transparent" />
    <div className="relative z-10 flex flex-col gap-4 p-6 sm:p-12">
      <h2 className="font-titles text-4xl font-extrabold text-primary-foreground drop-shadow-lg sm:text-6xl">
        {label}
      </h2>
      <button className="inline-flex w-fit items-center gap-2 bg-foreground px-6 py-3 font-titles text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-lg transition-all hover:bg-accent hover:shadow-xl sm:px-8">
        {enterLabel}
      </button>
    </div>
  </Link>
);

const HomeSelector = () => {
  const { t, lang, setLang } = useTranslation();

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border bg-background px-4 py-3 sm:px-8 sm:py-4">
        <div className="flex items-center gap-3 sm:gap-6">
          <img src={tecportLogo} alt="Tecport" className="h-5 sm:h-6" />
          <div className="border-l border-border pl-3 sm:pl-6">
            <h1 className="font-titles text-sm font-bold leading-tight text-primary sm:text-xl">
              TRS4531 REACH STACKER
            </h1>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              {t.selector.subtitle}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          {LANGUAGES.map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-2 py-1 text-xs font-semibold uppercase transition-colors sm:px-3 sm:py-1.5 ${
                lang === l ? "text-accent" : "text-muted-foreground hover:text-primary"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </header>

      {/* Split container — stacks vertically on mobile, side-by-side on desktop */}
      <div className="grayscale-container flex flex-1 flex-col sm:flex-row">
        <SelectorPanel
          to="/trs4531-diesel"
          image={dieselImg}
          label={t.selector.diesel}
          enterLabel={t.selector.enter}
        />
        <SelectorPanel
          to="/trs4531-electric"
          image={electricImg}
          label={t.selector.electric}
          enterLabel={t.selector.enter}
        />
      </div>
    </div>
  );
};

export default HomeSelector;
