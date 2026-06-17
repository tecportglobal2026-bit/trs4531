import React from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  color?: string; // e.g. "#D95F1A" or "var(--primary)"
  className?: string;
}


const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, color = "#D95F1A", className = "" }) => (
  <div className={`mb-12 ${className}`}>
    <h2
      className="mb-12 text-accent"
      style={color ? { color } : {}}
    >
      {title}
    </h2>
    {subtitle && (
      <p className="mt-2 text-muted-foreground text-base md:text-lg font-normal">{subtitle}</p>
    )}
  </div>
);

export default SectionTitle;
