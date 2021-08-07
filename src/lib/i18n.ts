import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import messages from 'translation';

export const fallbackLng = 'ko';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng,
    resources: {
      ko: { translation: messages.kr },
      en: { translation: messages.us },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
