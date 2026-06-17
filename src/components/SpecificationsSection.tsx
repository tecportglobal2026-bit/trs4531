import React from "react";

/**
 * Componente reutilizable para mostrar especificaciones técnicas en formato grid.
 * Props:
 * - specs: objeto con las especificaciones (clave: string, valor: { label: string, value: string })
 * - specKeys: array de claves a mostrar (para controlar el orden)
 * - title: string para el título de la sección
 */
interface SpecificationsSectionProps {
  specs: Record<string, { label: string; value: string }>;
  specKeys: string[];
  title: string;
}

const SpecificationsSection: React.FC<SpecificationsSectionProps> = ({ specs, specKeys, title }) => {
  return (
    <section id="specs" className="section-padding bg-background">
      <div className="container">
        <h2 className="mb-12 text-accent">{title}</h2>
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden">
            {specKeys.map((key) => {
              const spec = specs[key];
              return (
                <div
                  key={key}
                  className="bg-background p-4 flex flex-col items-center justify-center text-center gap-2 min-h-[90px] hover:bg-secondary/50 transition-colors"
                >
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                    {spec.label}
                  </p>
                  <p className="text-base font-bold text-primary">
                    {spec.value}
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

export default SpecificationsSection;
