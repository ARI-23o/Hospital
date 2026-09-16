import React, { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../translations/translations";

const LanguageContext = createContext();

export const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "hi", label: "Hindi", native: "हिंदी" },
];

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem("ckc_lang");
      if (saved && ["en", "mr", "hi"].includes(saved)) {
        return saved;
      }
    } catch (e) {
      // Ignore localStorage errors
    }
    return "en";
  });

  const setLang = (newLang) => {
    if (["en", "mr", "hi"].includes(newLang)) {
      setLangState(newLang);
      try {
        localStorage.setItem("ckc_lang", newLang);
      } catch (e) {
        // Ignore localStorage errors
      }
    }
  };

  /**
   * Translate helper: dot notation lookup (e.g. t('nav.home'))
   * Fallback chain: active lang -> en -> fallback param -> key
   */
  const t = (keyPath, fallback = "") => {
    if (!keyPath) return fallback;

    const getNested = (obj, path) => {
      return path
        .split(".")
        .reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj);
    };

    const currentDict = translations[lang] || translations.en;
    const val = getNested(currentDict, keyPath);
    if (val !== undefined) return val;

    // Fallback to English
    const enVal = getNested(translations.en, keyPath);
    if (enVal !== undefined) return enVal;

    return fallback || keyPath;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, languages: LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
