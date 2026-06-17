import { useTranslation } from "@/i18n/LanguageContext";
import tecportLogo from "@/assets/logo-sin-fondo-tecport.webp";
import { MapPin, Phone } from "lucide-react";

const Footer = () => {
  const { t } = useTranslation();
  const offices = [t.offices.peru, t.offices.chile, t.offices.brazil, t.offices.usa];

  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <img
              src={tecportLogo}
              alt="Tecport"
              className="mb-4 h-10 w-auto"
            />
            <p className="text-sm opacity-70">{t.footer.tagline}</p>
          </div>

          {offices.map((office, i) => (
            <div key={i}>
              <h4 className="mb-3 text-sm font-semibold">{office.country}</h4>
              <div className="space-y-2 text-sm opacity-70">
                <p className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-3 w-3 flex-shrink-0" />
                  <span>
                    {office.address}
                    <br />
                    {office.city}
                    {'postalInfo' in office && (office as any).postalInfo && (
                      <>
                        <br />
                        {(office as any).postalInfo}
                      </>
                    )}
                  </span>
                </p>
                {office.phone && (
                  <p className="flex items-center gap-2">
                    <Phone className="h-3 w-3 flex-shrink-0" />
                    {office.phone}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-primary-foreground/20 pt-6 text-center text-xs opacity-50">
          © {new Date().getFullYear()} Tecport Latin America. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
