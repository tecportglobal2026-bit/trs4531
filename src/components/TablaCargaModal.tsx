import { X } from "lucide-react";
import React from "react";

interface TablaCargaModalProps {
  open: boolean;
  onClose: () => void;
  imgSrc: string;
  imgAlt?: string;
}

const TablaCargaModal: React.FC<TablaCargaModalProps> = ({ open, onClose, imgSrc, imgAlt }) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-accent"
          aria-label="Cerrar"
        >
          <X size={28} />
        </button>
        <img
          src={imgSrc}
          alt={imgAlt || "Tabla de Carga"}
          className="max-h-[85vh] w-auto object-contain"
        />
      </div>
    </div>
  );
};

export default TablaCargaModal;