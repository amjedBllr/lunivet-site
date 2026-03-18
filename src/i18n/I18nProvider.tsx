import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { LANGUAGES, type Language, translations } from "./translations";

type I18nContextValue = {
  lang: Language;
  dir: "ltr" | "rtl";
  setLang: (lang: Language) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "lunivet.lang";

function interpolate(template: string, vars?: Record<string, string | number>) {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, k: string) => (vars[k] ?? `{${k}}`).toString());
}

function resolveDir(lang: Language): "ltr" | "rtl" {
  return LANGUAGES.find((l) => l.code === lang)?.dir ?? "ltr";
}

function defaultLang(): Language {
  const stored = (typeof window !== "undefined" && window.localStorage.getItem(STORAGE_KEY)) as Language | null;
  if (stored && stored in translations) return stored;

  const browser = (typeof navigator !== "undefined" && navigator.language) ? navigator.language.toLowerCase() : "en";
  if (browser.startsWith("fr")) return "fr";
  if (browser.startsWith("ar")) return "ar";
  return "en";
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => defaultLang());

  const dir = useMemo(() => resolveDir(lang), [lang]);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      const value = translations[lang]?.[key] ?? translations.en[key] ?? key;
      return interpolate(value, vars);
    },
    [lang]
  );

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  const value: I18nContextValue = useMemo(() => ({ lang, dir, setLang, t }), [lang, dir, setLang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

