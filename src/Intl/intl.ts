import { createIntl, createIntlCache } from "@formatjs/intl";
// @ENV:dev
import { defineMessage } from "@formatjs/intl";

/**
 * Create a intl Message
 * @param key
 * @param defaultMessages
 * @returns The intl Message
 */
const createMessage = (
  key: keyof typeof defaultMessages,
  defaultMessages: Record<string, string>
) => {
  const id = <string>key;
  const defaultMessage = defaultMessages[key];
  const message = defineMessage({ id, defaultMessage });
  return message;
};
const createMessage_key =
  (defaultMessages: Record<string, string>) =>
  (key: keyof typeof defaultMessages) =>
    createMessage(key, defaultMessages);

/**
 * Create a intl Options
 * @param key 
 * @param options 
 * @param defaultOptions 
 * @returns The intl Options
 */
const createOptions = (
  key: keyof typeof defaultOptions,
  options: Record<string, object>,
  defaultOptions: Record<string, object>
): object => {
  const values = options[key] ?? defaultOptions[key];
  return values;
};
const createOptions_key =
  (options: Record<string, object>, defaultOptions: Record<string, object>) =>
  (key: keyof typeof defaultOptions) =>
    createOptions(key, options, defaultOptions);

/**
 * Create a intl unknown
 * @param key 
 * @param unknowns 
 * @param defaultUnknowns 
 * @returns The intl unknown
 */
const createUnknown = (
  key: keyof typeof defaultUnknowns,
  unknowns: Record<string, any>,
  defaultUnknowns: Record<string, any>
) => {
  const values = unknowns[key] ?? defaultUnknowns[key];
  return values;
};
const createUnknown_key =
  (unknowns: Record<string, any>, defaultUnknowns: Record<string, any>) =>
  (key: keyof typeof defaultUnknowns) =>
    createUnknown(key, unknowns, defaultUnknowns);

/**
 * Get a value intl Type
 * @param value 
 * @returns The intl Type
 */
function intlType(value: unknown) {
  const type = typeof value;
  switch (type) {
    case "string":
      return "Message";
    case "object":
      return "Options";
    default:
      console.error("Unhandled type", type);
      return "unknown";
  }
}

/**
 * Index the locale by intl Type
 * @param localeObject 
 * @returns 
 */
function indexLocale_intlType(localeObject: { [key: string]: unknown }) {
  return Object.entries(localeObject).reduce((localeRecord, [key, value]) => {
    const type = intlType(value);
    if (undefined === localeRecord[type]) {
      localeRecord[type] = {} as Record<string, typeof type>;
    }
    localeRecord[type][key] = value;
    return localeRecord;
  }, {} as Record<ReturnType<typeof intlType>, Record<string, any>>);
}

/**
 * Define intl to use with
 * @param {string} o.locale The locale to use
 * @param {string} o.defaultLocale The default locale for the application
 * @param o.values The values from the locale
 * @param o.defaults The defaults from the default locale
 * @returns The intl to use with
 */
export function intlWith({
  locale,
  defaultLocale,
  values,
  defaults,
}: {
  locale: string;
  defaultLocale: string;
  values: { [key: string]: unknown };
  defaults: { [key: string]: unknown };
}) {
  // console.info("@/Intl/intl::intlWith", { locale, defaultLocale, values, defaults });

  // index defaults & values by intl type
  const defaultsType = indexLocale_intlType(defaults);
  const valuesType = indexLocale_intlType(values);

  // Message
  const defaultMessages: Record<string, string> = defaultsType["Message"];
  const messages: Record<string, string> = valuesType["Message"];
  const intlMessage = createMessage_key(defaultMessages);
  // console.info("@/Intl/intl::intlWith", { messages, defaultMessages });

  // Options
  const defaultOptions: Record<string, object> = defaultsType["Options"];
  const options: Record<string, object> = valuesType["Options"];
  const intlOptions = createOptions_key(options, defaultOptions);
  // console.info("@/Intl/intl::intlWith", { options, defaultOptions });

  // unknown
  const defaultUnknowns: Record<string, any> = defaultsType["unknown"];
  const unknowns: Record<string, any> = valuesType["unknown"];
  const intlUnknown = createUnknown_key(unknowns, defaultUnknowns);
  // console.info("@/Intl/intl::intlWith", { unknowns, defaultUnknowns });

  // Create intl with cache
  // Cache is optional but highly recommended since it prevents memory leak
  const cache = createIntlCache();
  const intl = createIntl(
    {
      locale,
      messages,
      defaultLocale,
    },
    cache
  );
  // console.info("@/Intl/intl::intlWith", { intl });

  // console.info("@/Intl/intl::intlWith", { intl, intlMessage, intlOptions, intlUnknown });
  return { intl, intlMessage, intlOptions, intlUnknown };
}
