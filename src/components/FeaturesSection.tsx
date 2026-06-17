import React from "react";

interface Feature {
  title: string;
  desc: string;
}

interface FeaturesSectionProps {
  features: Record<string, Feature>;
  featuresTitle: string;
}

/**
 * FeaturesSection
 * Grid de características con títulos y descripción visible.
 * Reutilizable para variantes diesel y eléctrica.
 */
const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  features,
  featuresTitle,
}) => {
  const featureKeys = Object.keys(features);
  return (
    <section id="features" className="pb-24 pt-12 bg-background">
      <div className="container">
        <h2 className="mb-12 text-accent">{featuresTitle}</h2>
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featureKeys.map((key) => {
              const f = features[key];
              return (
                <div
                  key={key}
                  className="border border-border p-8 transition-all hover:border-accent hover:shadow-md"
                >
                  <h3 className="mb-3 text-primary">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
