import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const translationsRU = require("./translations/ru.json");
const translationsEN = require("./translations/en.json");
console.log(translationsEN)
i18n
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, 
    },
    resources: {
      en: translationsEN,
      ru: translationsRU,
    }
  });

export default i18n;
