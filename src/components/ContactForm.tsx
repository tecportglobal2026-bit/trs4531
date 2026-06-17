import React, { useState } from "react";
import FormFields from "./FormFields";

interface ContactFormProps {
  lang: string;
  variant: string;
  t: any;
  imageSrc?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ lang, variant, t, imageSrc }) => {
  const [phone, setPhone] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);


  // Validación de correo corporativo
  const validateCorporateEmail = (value: string) => {
    // Dominios no permitidos
    const forbiddenDomains = [
      /@(gmail|hotmail|outlook|yahoo)\./i,
      /@.*\.edu(\.|\b)/i,
      /@.*\.ac(\.|\b)/i,
      /@.*\.student\./i,
      /@.*\.alumno\./i,
      /@.*\.alunos\./i,
      /@.*\.mail\./i,
      /@icloud\./i,
      /@live\./i,
      /@protonmail\./i,
      /@aol\./i,
      /@msn\./i,
      /@ymail\./i,
      /@gmx\./i,
      /@zoho\./i,
      /@yandex\./i,
      /@mailinator\./i,
      /@example\./i,
    ];
    if (!value) return "";
    for (const regex of forbiddenDomains) {
      if (regex.test(value)) {
        return "Por favor, utiliza un correo corporativo. No se aceptan correos de Gmail, Outlook personal, Yahoo o dominios educativos.";
      }
    }
    return "";
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateCorporateEmail(value));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validar email antes de enviar
    const currentEmailError = validateCorporateEmail(email);
    setEmailError(currentEmailError);
    if (currentEmailError) return;
    setIsSubmitting(true);
    setSubmitStatus(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: email,
      phone: phone,
      message: formData.get("message") as string,
      lang: lang,
      page: variant,
    };

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbzf98HuvIhVdhlKMN8H9QnD_MCkl9o9Tikk7CWmOYti7BAL70eoPRlFuNpFAiVR73N-ag/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          mode: "no-cors",
        }
      );
      setSubmitStatus({
        type: "success",
        message:
          lang === "es"
            ? "¡Mensaje enviado con éxito!"
            : lang === "en"
            ? "Message sent successfully!"
            : "Mensagem enviada com sucesso!",
      });
      form.reset();
      setPhone("");
      setAcceptTerms(false);
      setEmail("");
      setEmailError("");
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          lang === "es"
            ? "Error de conexión. Por favor, verifique su internet."
            : lang === "en"
            ? "Connection error. Please check your internet."
            : "Erro de conexão. Verifique sua internet.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row items-center md:items-start gap-8">
      {imageSrc && (
        <div className="w-full md:w-1/3 flex-shrink-0 flex justify-center md:justify-start mb-4 md:mb-0">
          <img
            src={imageSrc}
            alt="Imagen contacto"
            className="max-w-xs w-full h-auto object-contain rounded-xl shadow-lg bg-white"
            loading="lazy"
          />
        </div>
      )}
      <form className="space-y-4 w-full md:w-2/3" onSubmit={handleSubmit} noValidate>
        <FormFields
          lang={lang}
          t={t}
          phone={phone}
          setPhone={setPhone}
          acceptTerms={acceptTerms}
          setAcceptTerms={setAcceptTerms}
          isSubmitting={isSubmitting}
          submitStatus={submitStatus}
          email={email}
          onEmailChange={handleEmailChange}
          emailError={emailError}
        />
      </form>
    </div>
  );
};

export default ContactForm;
