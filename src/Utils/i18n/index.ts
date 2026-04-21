import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as RNLocalize from "react-native-localize";

import en from "./Locales/en.json";
import pt from "./Locales/pt.json";

const resources = {
  en: { translation: en },
  pt: { translation: pt },
};

const getDeviceLanguage = () => {
  const locales = RNLocalize.getLocales();
  return locales[0]?.languageCode || "en";
};

i18n.use(initReactI18next).init({
  resources,
  lng: getDeviceLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
