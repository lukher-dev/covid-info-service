import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import translationEN from './locales/en.json'
import translationPL from './locales/pl.json'

const resources = {
  en: {
    translation: translationEN,
  },
  pl: {
    translation: translationPL,
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    keySeparator: true,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })

export default i18n
