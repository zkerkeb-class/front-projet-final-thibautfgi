// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import fr from "./translations/fr.json";
import en from "./translations/en.json";

interface Resources {
    translation: {
        [key: string]: string;
    };
}

const resources = {
    fr: { translation: fr },
    en: { translation: en },
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "fr",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;