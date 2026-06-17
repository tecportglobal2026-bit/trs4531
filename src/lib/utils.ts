import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Shared robust corporate email validation
export function validateCorporateEmail(value: string, lang: string = 'es'): string {
  // Forbidden domains and patterns
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
    /@bol\.com\.br/i,
    /@uol\.com\.br/i,
    /@terra\.com\.br/i
  ];
  if (!value) return "";
  for (const regex of forbiddenDomains) {
    if (regex.test(value)) {
      if (lang === 'es') return 'Por favor, utiliza un correo corporativo. No se aceptan correos de Gmail, Outlook personal, Yahoo o dominios educativos.';
      if (lang === 'en') return 'Please use a corporate email. Gmail, personal Outlook, Yahoo, and educational domains are not accepted.';
      if (lang === 'pt') return 'Por favor, use um e-mail corporativo. Não são aceitos e-mails do Gmail, Outlook pessoal, Yahoo ou domínios educacionais.';
      return 'Please use a corporate email.';
    }
  }
  return "";
}
