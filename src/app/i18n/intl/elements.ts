import { intlWith } from "@/Intl/intl";

import defaultLocale from "./defaultLocale.json";
const modules = <Record<string, () => Promise<{[key: string]: unknown}>>>import.meta.glob("./locales/*.json", { import: "default" });
const localeModule = async (locale: string) => await modules[`./locales/${locale}.json`]();

// import defaults locale
const defaults = await localeModule(defaultLocale);

/**
 * Transform Elements for the locale
 * @param {string} locale The locale to use
 * @returns The toIntlElements functions
 */
export default async function toIntlLocaleElements(locale: string) {
  // import translated values for the locale
  const values = await localeModule(locale);

  const { intl, intlMessage, intlOptions } = intlWith({
    defaultLocale,
    defaults,
    locale,
    values,
  });

  // create toIntlString function, then transform the element with this function
  return <Record<string, (element: Element) => void>>{
    settings: (element) => {
      const toString = (): string =>
        intl.formatMessage(intlMessage("settings"));
      element.textContent = toString();
    },

    language: (element) => {
      const toString = (): string =>
        intl.formatMessage(intlMessage("language"));
      element.textContent = toString();
    },

    theme: (element) => {
      const toString = (): string => intl.formatMessage(intlMessage("theme"));
      element.textContent = toString();
    },

    score: (element) => {
      const toString = (score: number): string => intl.formatNumber(score);
      const value = element.textContent ? parseInt(element.textContent) : 0;
      element.textContent = toString(value);
    },

    price: (element) => {
      const toString = (price: number): string =>
        intl.formatNumber(price, {
          ...intlOptions("price"),
          style: "currency",
        });

      const value = element.textContent ? parseInt(element.textContent) : 0;
      element.textContent = toString(value);
    },

    today: (element) => {
      const toString = (): string =>
        intl.formatMessage(intlMessage("today"), { now: Date.now() });
      element.textContent = toString();
    },

    play: (element) => {
      // create toString from intl message
      const toString = (): string => intl.formatMessage(intlMessage("play"));
      element.textContent = toString();
    },
  };
}
