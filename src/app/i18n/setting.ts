import type { I18n } from "./types";
import toIntlLocaleElements from "./intl/elements";

import * as $setting from "@/Setting/setting";
import key from "./key.json";
import defaultValue from "./defaultValue";
import collection from "./collection";

/**
 * Use a I18n
 * @private
 * @param {!I18n} i18n The I18n to use
 */
function use(i18n: I18n): void {
  __setLang(i18n["lang"]);
  __toIntl(i18n["locale"]);
}

/**
 * Set a I18n lang
 * @private
 * @param {!I18n["lang"]} lang The lang to set
 */
function __setLang(lang: I18n["lang"]): void {
  // set <html> "lang" attribute
  const root = document.documentElement;
  root.setAttribute("lang", lang);
}

/**
 * Transform document elements with its corresponding `[data-int]` toIntlElement function
 * @private
 */
async function __toIntl(locale: I18n["locale"]) {
  const attribute = "data-intl";
  const selector = "[data-intl]";

  // get intlElements
  const toIntlElements = await toIntlLocaleElements(locale);

  // get Element list with `data-intl` attribute
  // and transform to intl element
  document.querySelectorAll(selector).forEach((element) => {
    // get [data-intl] value
    const dataIntl = element.getAttribute(attribute)!;

    const toIntlElement = toIntlElements[dataIntl as keyof typeof toIntlElements];
    if (undefined === toIntlElement) {
      // throw Error(`Missing intl element "${dataIntl}"`);
      console.error("Missing intl element", dataIntl);
    } else {
      toIntlElement(element);
    }
  });
}

const setting = $setting.create({
  collection,
  use,
  defaultValue,
  key,
});
export default setting;
