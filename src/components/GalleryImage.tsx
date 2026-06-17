import { memo } from "react";

interface GalleryImageProps {
  src: string;
  alt: string;
  index: number;
}

/**
 * Componente optimizado para mostrar una imagen de galería.
 * Usa carga eager/sync para las primeras imágenes y lazy/async para el resto.
 */
const GalleryImage = memo(({ src, alt, index }: GalleryImageProps) => {
  return (
    <div className="gallery-item">
      <img
        src={src}
        alt={alt}
        className="gallery-image"
        loading={index < 4 ? "eager" : "lazy"}
        decoding={index < 4 ? "sync" : "async"}
        width="600"
        height="400"
      />
    </div>
  );
});

GalleryImage.displayName = "GalleryImage";

export default GalleryImage;
