import type { Theme } from "./types";

import * as $setting from "@/Setting/setting";
import key from "./key.json";
import defaultValue from "./defaultValue.json";
import collection from "./collection";

/**
 * Use a Theme
 * @param {!Theme} theme The theme to use
 */
function use(theme: Theme): void {
  __setColorScheme(theme.colorScheme);
  __importCSS(theme.__dirname, theme.__filenames);
}

/**
 * Set a Theme color-scheme
 * @private
 * @param {!Theme["colorScheme"]} colorScheme The color-scheme to set
 */
function __setColorScheme(colorScheme: Theme["colorScheme"]): void {
  // set <html> "color-scheme" attribute
  const root = document.documentElement;
  root.setAttribute("color-scheme", colorScheme);
}

/**
 * Import a Theme CSS files
 * @private
 * @param {!Theme["__dirname"]} dirname The Theme directory name
 * @param {!Theme["__filenames"]} filenames The Theme CSS filenames
 */
function __importCSS(
  dirname: Theme["__dirname"],
  filenames: Theme["__filenames"]
): void {
  filenames.forEach(async (filename) => {
    // @TODO: fix warning: Default import of CSS without `?inline` is deprecated.
    // This is a ViteJS issue, @see: https://github.com/vitejs/vite/issues/12001
    console.info(
      `import CSS file ('@/app/theme')"./${dirname}/${filename}.css"`
    );
    await import(`./${dirname}/${filename}.css`);
  });
}

const setting = $setting.create({
  key,
  defaultValue,
  collection,
  use,
});
export default setting;
