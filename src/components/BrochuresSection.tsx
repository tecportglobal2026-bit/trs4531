import { useState } from "react";
import { Download, FileText, X } from "lucide-react";
import FormFields from "./FormFields";
import { validateCorporateEmail } from "@/lib/utils";

interface BrochureLinks {
  technical: { es: string; en: string; pt: string };
  commercial: { es: string; en: string; pt: string };
}

interface BrochuresSectionProps {
  brochures: BrochureLinks;
  backgroundImage: string;
  translations: {
    title: string;
    technical: string;
    commercial: string;
    modalTitle: string;
    modalSubtitle: string;
    name: string;
    lastName: string;
    email: string;
    phone: string;
    terms: string;
    download: string;
    downloading: string;
  };
  lang: 'es' | 'en' | 'pt';
  product: string;
  variant: string;
}

const BrochuresSection = ({ 
  brochures, 
  backgroundImage, 
  translations, 
  lang, 
  product,
  variant 
}: BrochuresSectionProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBrochure, setSelectedBrochure] = useState<'technical' | 'commercial' | null>(null);
  const [phone, setPhone] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{type: 'success' | 'error', message: string} | null>(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleOpenModal = (type: 'technical' | 'commercial') => {
    setSelectedBrochure(type);
    setModalOpen(true);
    setSubmitStatus(null);
    setAcceptTerms(false);
    setPhone("");
    setIsSubmitting(false);
  };

  const handleCloseModal = () => {
    if (!isSubmitting) {
      setModalOpen(false);
      setSelectedBrochure(null);
      setSubmitStatus(null);
      setAcceptTerms(false);
      setPhone("");
      setIsSubmitting(false);
    }
  };

  const handleDownload = () => {
    if (!selectedBrochure) return;
    const url = brochures[selectedBrochure][lang];
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop() || 'brochure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  // Shared email change handler
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateCorporateEmail(value, lang));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedBrochure) return;

    // Validate email before submit
    const currentEmailError = validateCorporateEmail(email, lang);
    setEmailError(currentEmailError);
    if (currentEmailError) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      type: 'brochure',
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: email,
      phone: phone,
      product: product,
      variant: variant,
      document: selectedBrochure === 'technical' ? translations.technical : translations.commercial,
      lang: lang,
      page: variant.toLowerCase()
    };

    try {
      await fetch(
        'https://script.google.com/macros/s/AKfycbwO2IHx2qa72HfsiH33LxenirNn-S8sjKYgoxNnkMyf6x9NIak2C07x_IT6yh4NU3QpDQ/exec',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
          mode: 'no-cors'
        }
      );

      setSubmitStatus({ 
        type: 'success', 
        message: lang === 'es' ? '¡Descargando brochure...' : lang === 'en' ? 'Downloading brochure...' : 'Baixando brochure...'
      });
      setTimeout(() => {
        handleDownload();
        setTimeout(() => {
          setIsSubmitting(false);
          handleCloseModal();
        }, 2000);
      }, 1000);
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: lang === 'es' ? 'Error de conexión. Por favor, intenta nuevamente.' : 
                 lang === 'en' ? 'Connection error. Please try again.' : 
                 'Erro de conexão. Tente novamente.' 
      });
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section 
        id="brochures" 
        className="parallax-section relative py-16"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {/* Overlay sutil solo para legibilidad */}
        <div className="absolute inset-0 bg-primary/40" />
        
        <div className="container relative z-10">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center">
              <h2 className="text-accent">{translations.title}</h2>
            </div>
            
            <div className="grid gap-5 md:grid-cols-2">
              {/* Técnico */}
              <button
                onClick={() => handleOpenModal('technical')}
                className="group relative overflow-hidden border-2 border-primary-foreground/30 bg-primary/60 backdrop-blur-md px-8 py-6 transition-all hover:border-accent hover:bg-accent hover:shadow-lg"
              >
                <div className="relative z-10 flex items-center gap-4">
                  <FileText className="h-10 w-10 flex-shrink-0 text-primary-foreground transition-colors group-hover:text-accent-foreground" />
                  <div className="flex-1 text-left">
                    <h3 className="font-titles text-lg font-bold uppercase tracking-wide text-primary-foreground transition-colors group-hover:text-accent-foreground">
                      {translations.technical}
                    </h3>
                    <div className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary-foreground/70 transition-colors group-hover:text-accent-foreground/90">
                      <Download className="h-3 w-3" />
                      PDF
                    </div>
                  </div>
                </div>
              </button>

              {/* Comercial */}
              <button
                onClick={() => handleOpenModal('commercial')}
                className="group relative overflow-hidden border-2 border-primary-foreground/30 bg-primary/60 backdrop-blur-md px-8 py-6 transition-all hover:border-accent hover:bg-accent hover:shadow-lg"
              >
                <div className="relative z-10 flex items-center gap-4">
                  <FileText className="h-10 w-10 flex-shrink-0 text-primary-foreground transition-colors group-hover:text-accent-foreground" />
                  <div className="flex-1 text-left">
                    <h3 className="font-titles text-lg font-bold uppercase tracking-wide text-primary-foreground transition-colors group-hover:text-accent-foreground">
                      {translations.commercial}
                    </h3>
                    <div className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-primary-foreground/70 transition-colors group-hover:text-accent-foreground/90">
                      <Download className="h-3 w-3" />
                      PDF
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={handleCloseModal}
        >
          <div
            className="relative w-full max-w-md bg-background border border-border"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="border-b border-border px-6 py-4">
              <button
                onClick={handleCloseModal}
                disabled={isSubmitting}
                className="absolute right-4 top-4 text-muted-foreground hover:text-foreground disabled:opacity-50"
                aria-label="Cerrar"
              >
                <X size={24} />
              </button>
              <h3 className="font-titles text-xl font-bold text-primary pr-8">
                {translations.modalTitle}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {translations.modalSubtitle}
              </p>
            </div>

            {/* Form (reusing FormFields) */}
            <form className="p-6 space-y-4" onSubmit={handleSubmit} noValidate>
              <FormFields
                lang={lang}
                t={{ contact: translations }}
                phone={phone}
                setPhone={setPhone}
                acceptTerms={acceptTerms}
                setAcceptTerms={setAcceptTerms}
                isSubmitting={isSubmitting}
                submitStatus={submitStatus}
                email={email}
                onEmailChange={handleEmailChange}
                emailError={emailError}
                hideMessageField={true}
                hideSubmitButton={true}
              />
              {/* Remove message textarea for brochure form, only use fields above */}
              <button
                type="submit"
                disabled={!acceptTerms || isSubmitting || !!emailError}
                className="w-full bg-accent px-8 py-3 font-titles text-sm font-bold uppercase text-accent-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? translations.downloading : translations.download}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BrochuresSection;
