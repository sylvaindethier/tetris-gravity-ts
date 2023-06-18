/**
 * ThemeManifest
 * @type
 */
export type ThemeManifest = {
  value: string;
  text: string;
  colorScheme: string;
  cssFiles: string[];
};

/**
 * Theme
 * @type
 */
export type Theme = ThemeManifest & {
  __dirname: string;
  __filenames: string[];
};
