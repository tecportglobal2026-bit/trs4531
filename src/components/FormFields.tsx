
import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "@/phone-input.css";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

interface FormFieldsProps {
  lang: string;
  t: any;
  phone: string;
  setPhone: (value: string) => void;
  acceptTerms: boolean;
  setAcceptTerms: (value: boolean) => void;
  isSubmitting: boolean;
  submitStatus: { type: "success" | "error"; message: string } | null;
  email: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  emailError: string;
  hideMessageField?: boolean;
  hideSubmitButton?: boolean;
}

const FormFields: React.FC<FormFieldsProps> = ({
  lang,
  t,
  phone,
  setPhone,
  acceptTerms,
  setAcceptTerms,
  isSubmitting,
  submitStatus,
  email,
  onEmailChange,
  emailError,
  hideMessageField = false,
  hideSubmitButton = false,
}) => {
  return (
    <>
      {submitStatus && (
        <div
          className={`p-4 border ${
            submitStatus.type === "success"
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          <p className="text-sm font-medium">{submitStatus.message}</p>
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          type="text"
          name="firstName"
          placeholder={t.contact.name}
          required
        />
        <Input
          type="text"
          name="lastName"
          placeholder={t.contact.lastName}
          required
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="phone-input-container">
          <PhoneInput
            key={lang}
            country={"pe"}
            value={phone}
            onChange={setPhone}
            enableSearch
            disableSearchIcon
            searchPlaceholder="Buscar país..."
            preferredCountries={["pe", "ar", "br", "us", "mx", "cl", "co", "uy", "py"]}
            countryCodeEditable={false}
            enableAreaCodes={false}
            disableCountryCode={false}
            disableDropdown={false}
            autoFormat={true}
          />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <Input
            type="email"
            name="email"
            placeholder={t.contact.email}
            required
            value={email}
            onChange={onEmailChange}
            autoComplete="off"
            className={emailError ? "border-red-500" : ""}
          />
          {emailError && (
            <span className="text-xs text-red-600 font-medium">{emailError}</span>
          )}
        </div>
      </div>
      {!hideMessageField && (
        <Textarea
          name="message"
          rows={5}
          placeholder={t.contact.message}
        />
      )}
      <div className="flex items-center gap-2">
        <Checkbox
          id="terms"
          checked={acceptTerms}
          onCheckedChange={setAcceptTerms}
          required
        />
        <Label htmlFor="terms" className="text-muted-foreground cursor-pointer">
          {t.contact.terms}
        </Label>
      </div>
      {!hideSubmitButton && (
        <button
          type="submit"
          disabled={!acceptTerms || isSubmitting || !!emailError}
          className="bg-primary px-8 py-3 font-titles text-sm font-bold uppercase text-primary-foreground transition-colors hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting
            ? lang === "es"
              ? "Enviando..."
              : lang === "en"
              ? "Sending..."
              : "Enviando..."
            : t.contact.send}
        </button>
      )}
    </>
  );
};

export default FormFields;
