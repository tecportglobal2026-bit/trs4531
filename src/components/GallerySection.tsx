import { useState } from "react";
import GalleryImage from "@/components/GalleryImage";
import { Button } from "@/components/ui/button";

interface GalleryVideo {
  src: string;
  videoLabel: string;
  photosLabel: string;
}

interface GallerySectionProps {
  galleryImages: { src: string; alt: string }[];
  tablaCargaImg: string;
  galleryTitle: string;
  lang: string;
  video?: GalleryVideo;
}

type GalleryView = "images" | "video";

const GallerySection = ({
  galleryImages,
  tablaCargaImg,
  galleryTitle,
  video,
}: GallerySectionProps) => {
  const [tablaCargaOpen, setTablaCargaOpen] = useState(false);
  const [view, setView] = useState<GalleryView>("images");

  const isVideoView = view === "video";
  const toggleView = () => setView(isVideoView ? "images" : "video");

  return (
    <section id="gallery" className="section-padding bg-secondary">
      <div className="container">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-accent">{galleryTitle}</h2>
          <div className="flex flex-wrap gap-2">
            {video && (
              <Button
                onClick={toggleView}
                variant="outline"
                className="font-titles text-xs font-bold uppercase tracking-wider"
                aria-pressed={isVideoView}
              >
                {isVideoView ? video.photosLabel : video.videoLabel}
              </Button>
            )}
            <Button
              onClick={() => setTablaCargaOpen(true)}
              className="font-titles text-xs font-bold uppercase tracking-wider"
            >
              Tabla de Carga
            </Button>
          </div>
        </div>

        {video && isVideoView ? (
          <div className="flex justify-center">
            <video
              key={video.src}
              src={video.src}
              controls
              autoPlay
              playsInline
              className="block max-h-[80vh] w-auto rounded-lg shadow-lg"
            />
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((img, i) => (
              <GalleryImage key={img.src} src={img.src} alt={img.alt} index={i} />
            ))}
          </div>
        )}
      </div>

      {tablaCargaOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setTablaCargaOpen(false)}
        >
          <div
            className="relative max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setTablaCargaOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-accent"
              aria-label="Cerrar"
            >
              ×
            </button>
            <img
              src={tablaCargaImg}
              alt="Tabla de Carga TRS4531"
              className="max-h-[85vh] w-auto object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
