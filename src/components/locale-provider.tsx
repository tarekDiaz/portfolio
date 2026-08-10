"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import en from "@/locales/en.json";
import es from "@/locales/es.json";
import ca from "@/locales/ca.json";

type Locale = "en" | "es" | "ca";

type TranslationValue = string | TranslationObject;

type TranslationObject = {
  [key: string]: TranslationValue;
};

const translations: Record<Locale, TranslationObject> = {
  en,
  es,
  ca,
};

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function getNestedTranslation(
  translation: TranslationObject,
  key: string
): string | undefined {
  const value = key.split(".").reduce<TranslationValue | undefined>(
    (currentValue, currentKey) => {
      if (
        currentValue !== undefined &&
        typeof currentValue === "object" &&
        currentKey in currentValue
      ) {
        return currentValue[currentKey];
      }

      return undefined;
    },
    translation
  );

  return typeof value === "string" ? value : undefined;
}

export function LocaleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    try {
      const savedLocale = localStorage.getItem("locale");

      if (
        savedLocale === "en" ||
        savedLocale === "es" ||
        savedLocale === "ca"
      ) {
        setLocaleState(savedLocale);
        document.documentElement.lang = savedLocale;
      }
    } catch {
      // localStorage puede no estar disponible.
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);

    try {
      localStorage.setItem("locale", newLocale);
    } catch {
      // localStorage puede no estar disponible.
    }

    document.documentElement.lang = newLocale;
  };

  const t = (key: string) => {
    return (
      getNestedTranslation(translations[locale], key) ??
      getNestedTranslation(translations.en, key) ??
      key
    );
  };

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t,
    }),
    [locale]
  );

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }

  return context;
}