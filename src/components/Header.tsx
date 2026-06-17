import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "@/i18n/LanguageContext";
import tecportLogo from "@/assets/tecport-logo.webp";
import { Menu, X } from "lucide-react";

const Header = () => {
  const { t, lang, setLang } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
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
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container relative flex h-20 items-center justify-between">
        {/* Logo (left) */}
        <Link to="/" className="flex-shrink-0 z-10">
          <img 
            src={tecportLogo} 
            alt="Tecport" 
            className="h-6 w-auto transition-all duration-300"
          />
        </Link>

        {/* Centered nav (desktop only) */}
        {isLanding && (
          <nav
            className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-6"
            style={{ minWidth: "max-content" }}
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`header-nav-text transition-colors duration-200 hover:text-accent ${
                  activeSection === item.id 
                    ? "text-accent" 
                    : scrolled 
                      ? "text-muted-foreground" 
                      : "text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}

        {/* Languages & mobile menu (right) */}
        <div className="flex items-center gap-4 z-10">
          <div className={`flex items-center gap-1 border-l pl-4 ${
            scrolled ? "border-border" : "border-white/30"
          }`}>
            {languages.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`header-nav-text px-2 py-1 transition-colors duration-200 ${
                  lang === l
                    ? "text-accent"
                    : scrolled
                      ? "text-muted-foreground hover:text-foreground"
                      : "text-white/70 hover:text-white"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {isLanding && (
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className={`flex items-center justify-center rounded-md p-2 transition-colors duration-200 hover:text-accent lg:hidden ${
                scrolled ? "text-foreground" : "text-white"
              }`}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isLanding && menuOpen && (
        <nav className="border-t border-border bg-background px-4 pb-4 lg:hidden">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMenuOpen(false)}
              className={`header-nav-text block py-3 transition-colors duration-200 hover:text-accent ${
                activeSection === item.id ? "text-accent" : "text-muted-foreground"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
