import React from "react";

interface TechnologySectionProps {
  tech: Record<string, { title: string; desc: string }>;
  techTitle: string;
  techImg: string;
  techImgAlt?: string;
}

/**
 * Sección de tecnologías para variantes (diesel, electric, etc).
 * Recibe los datos por props y muestra el título, lista de tecnologías y una imagen.
 */
const TechnologySection: React.FC<TechnologySectionProps> = ({ tech, techTitle, techImg, techImgAlt }) => {
  const techKeys = Object.keys(tech) as (keyof typeof tech)[];
  return (
    <section id="technology" className="bg-secondary">
      <div className="grid items-stretch lg:grid-cols-2">
        <div className="flex flex-col justify-center space-y-8 px-8 lg:px-16">
          <div>
            <h2 className="mb-8 text-accent">{techTitle}</h2>
          </div>
          {techKeys.map((key) => {
            const t = tech[key];
            return (
              <div key={key}>
                <h3 className="mb-2 text-primary">{t.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
              </div>
            );
          })}
        </div>
        <div className="tech-image-container">
          <img
            src={techImg}
            alt={techImgAlt || "Technology"}
            className="tech-image"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;

