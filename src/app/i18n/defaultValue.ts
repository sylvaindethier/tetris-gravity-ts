import collection from "./collection";
import defaultLocale from "./intl/defaultLocale.json";

// Supported app languages
const collectionLanguages = collection.map((i18n) => i18n.lang);

// Set the default value to the first navigator language which matches the collection languages
// or to defaultLocale if none
const defaultValue = navigator.languages.find((lang) => collectionLanguages.includes(lang)) ?? defaultLocale;
export default defaultValue;
