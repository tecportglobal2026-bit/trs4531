import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "@/i18n/LanguageContext";
import tecportLogo from "@/assets/tecport-logo.png";

const Header = () => {
  const { t, lang, setLang } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const location = useLocation();
  const isLanding = location.pathname !== "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isLanding) return;
    const sections = ["hero", "features", "technology", "specs", "gallery", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isLanding]);

  const navItems = [
    { id: "hero", label: t.nav.home },
    { id: "features", label: t.nav.features },
    { id: "technology", label: t.nav.tech },
    { id: "specs", label: t.nav.specs },
    { id: "gallery", label: t.nav.gallery },
    { id: "contact", label: t.nav.contact },
  ];

  const languages = ["es", "en", "pt"] as const;

  return (
    <header
      className={`sticky top-0 z-50 bg-background transition-shadow duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="flex-shrink-0">
          <img src={tecportLogo} alt="Tecport" className="h-10 w-auto" />
        </Link>

        <div className="flex items-center gap-8">
          {isLanding && (
            <nav className="hidden items-center gap-6 lg:flex">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-200 hover:text-accent ${
                    activeSection === item.id
                      ? "text-accent"
                      : "text-foreground"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          )}

          <div className="flex items-center gap-1 border-l border-border pl-4">
            {languages.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2 py-1 text-xs font-semibold uppercase transition-colors duration-200 ${
                  lang === l
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
