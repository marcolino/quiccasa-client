import config from "../config";
import { resources } from "../i18n";

/**
 * Find the first language from the browser's language, also primarized (ex.: "en_US" => "en") if needed,
 * which is among supported languages; if none found, return configured fallback language.
 */
export const getCurrentLanguage = (i18n) => {
  const browserLanguages = i18n.languages;
  const supportedLanguages = Object.keys(resources);
  const commonLanguages = browserLanguages.filter(language => supportedLanguages.includes(language));
  if (commonLanguages) { // found a supported language in browser languages
    return commonLanguages[0];
  } else { // not found a supported language in i18n browser languages, look for primary language
    const browserLanguagesPrimary = browserLanguages.map(browserLanguage => browserLanguage.split("_").pop());
    const commonLanguages = browserLanguagesPrimary.filter(language => supportedLanguages.includes(language));
    if (commonLanguages) { // found a supported language in browser primary languages
      return commonLanguages[0];
    } else {
      return config.languages.fallback; // return configured fallback language
    }
  }
}