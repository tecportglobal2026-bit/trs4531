import { useTranslation } from "@/i18n/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SofiaChat from "@/components/SofiaChat";
import heroElectric from "@/assets/hero-electric.jpg";
import electricMachine from "@/assets/trs4531-electric.png";
import canbusImg from "@/assets/canbus-technology.jpg";
import batteryImg from "@/assets/lfp-battery.jpg";
import cabinImg from "@/assets/operator-cabin.jpg";
import portImg from "@/assets/port-panorama.jpg";
import { ArrowRight, Battery, Zap, Leaf, ShieldCheck, Gauge, Droplets } from "lucide-react";

const ElectricPage = () => {
  const { t } = useTranslation();
  const e = t.electric;
  const features = e.features;
  const featureIcons = [Battery, Zap, Gauge, Leaf, ShieldCheck, Droplets];
  const featureKeys = Object.keys(features) as (keyof typeof features)[];
  const techKeys = Object.keys(e.tech) as (keyof typeof e.tech)[];
  const specKeys = Object.keys(e.specs) as (keyof typeof e.specs)[];
  const galleryImages = [electricMachine, batteryImg, cabinImg, portImg, canbusImg, heroElectric];

  return (
    <div className="bg-background">
      <Header />

      {/* Hero */}
      <section
        id="hero"
        className="relative flex min-h-[80vh] items-center"
        style={{
          backgroundImage: `url(${heroElectric})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-primary/60" />
        <div className="container relative z-10">
          <h1 className="max-w-3xl font-titles text-4xl font-extrabold text-primary-foreground md:text-6xl">
            {e.hero}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-primary-foreground/80">
            {e.heroSub}
          </p>
          <a
            href="#features"
            className="mt-8 inline-flex items-center gap-2 bg-accent px-8 py-3 font-titles text-sm font-bold uppercase text-accent-foreground transition-opacity hover:opacity-90"
          >
            {t.nav.features}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section-padding">
        <div className="container">
          <div className="accent-bar" />
          <h2 className="mb-12 text-3xl font-bold text-primary">{e.features_title}</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featureKeys.map((key, i) => {
              const Icon = featureIcons[i];
              const f = features[key];
              return (
                <div
                  key={key}
                  className="border border-border p-8 transition-colors hover:border-accent"
                >
                  <Icon className="mb-4 h-8 w-8 text-accent" />
                  <h3 className="mb-3 font-titles text-lg font-bold text-primary">
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology */}
      <section id="technology" className="section-padding bg-secondary">
        <div className="container">
          <div className="accent-bar" />
          <h2 className="mb-12 text-3xl font-bold text-primary">{e.tech_title}</h2>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              {techKeys.map((key) => {
                const tech = e.tech[key];
                return (
                  <div key={key}>
                    <h3 className="mb-2 font-titles text-lg font-bold text-primary">
                      {tech.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {tech.desc}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="overflow-hidden">
              <img
                src={batteryImg}
                alt="LFP Battery Technology"
                className="h-auto w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section id="specs" className="section-padding">
        <div className="container">
          <div className="accent-bar" />
          <h2 className="mb-12 text-3xl font-bold text-primary">{e.specs_title}</h2>
          <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
            {specKeys.map((key) => {
              const spec = e.specs[key];
              return (
                <div
                  key={key}
                  className="flex items-center justify-between bg-background p-6"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {spec.label}
                  </span>
                  <span className="font-titles text-sm font-bold text-primary">
                    {spec.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="section-padding bg-secondary">
        <div className="container">
          <div className="accent-bar" />
          <h2 className="mb-12 text-3xl font-bold text-primary">{e.gallery_title}</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((img, i) => (
              <div key={i} className="overflow-hidden bg-background">
                <img
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  className="h-64 w-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="section-padding">
        <div className="container">
          <div className="accent-bar" />
          <h2 className="mb-4 text-3xl font-bold text-primary">{t.contact.title}</h2>
          <p className="mb-12 text-muted-foreground">{t.contact.subtitle}</p>
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="grid gap-6 sm:grid-cols-2">
              {[t.offices.peru, t.offices.chile, t.offices.brazil, t.offices.usa].map(
                (office, i) => (
                  <div key={i} className="border border-border p-6">
                    <h3 className="mb-2 font-titles text-sm font-bold text-primary">
                      {office.country}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {office.address}
                      <br />
                      {office.city}
                    </p>
                    {office.phone && (
                      <p className="mt-2 text-sm font-semibold text-accent">
                        {office.phone}
                      </p>
                    )}
                  </div>
                )
              )}
            </div>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder={t.contact.name}
                  className="border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-accent"
                />
                <input
                  type="email"
                  placeholder={t.contact.email}
                  className="border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-accent"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder={t.contact.company}
                  className="border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-accent"
                />
                <input
                  type="tel"
                  placeholder={t.contact.phone}
                  className="border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-accent"
                />
              </div>
              <textarea
                rows={5}
                placeholder={t.contact.message}
                className="w-full border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-accent"
              />
              <button
                type="submit"
                className="bg-primary px-8 py-3 font-titles text-sm font-bold uppercase text-primary-foreground transition-colors hover:bg-accent"
              >
                {t.contact.send}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
      <SofiaChat variant="electric" />
    </div>
  );
};

export default ElectricPage;
