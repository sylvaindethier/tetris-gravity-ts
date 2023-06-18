import type { I18n, I18nManifest } from "./types";

// build I18n collection
const collection: I18n[] = [];
const modules = <Record<string, () => Promise<I18nManifest>>>import.meta.glob("./intl/locales/*.manifest.json", { import: "default" });
for (const path in modules) {
  // import i18n manifest
  const manifest = await modules[path]();

  // build I18n & add to collection
  const i18n = <I18n>manifest;
  collection.push(i18n);
}

export default collection;
