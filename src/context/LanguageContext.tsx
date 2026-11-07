import React, { createContext, useContext, useState } from 'react';
import { Language, getSiteContent, translations } from '../data/content';

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  content: (typeof translations)['id'];
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>('id');

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    document.documentElement.lang = lang;
  };

  const toggleLanguage = () => {
    setLanguage(language === 'id' ? 'en' : 'id');
  };

  const content = getSiteContent(language);

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, toggleLanguage, content }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    return {
      language: 'id',
      setLanguage: () => {},
      toggleLanguage: () => {},
      content: getSiteContent('id'),
    };
  }
  return ctx;
}
