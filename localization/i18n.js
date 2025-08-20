import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import arabic from './arabic.json';
import english from './english.json';

const resources = {
  en: { translation: english },
  ar: { translation: arabic }
};

const fallback = { languageTag: 'en', isRTL: false };
const { languageTag } =  fallback;

i18n.use(initReactI18next).init({
  resources,
  lng: languageTag,
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;