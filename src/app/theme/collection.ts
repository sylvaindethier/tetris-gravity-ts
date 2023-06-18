import type { ThemeManifest, Theme } from "./types";

// build Theme collection
const collection: Theme[] = [];
const modules = <Record<string, () => Promise<ThemeManifest>>>import.meta.glob("./**/manifest.json", { import: "default" });
const dotCSS = ".css";
for (const path in modules) {

  // import theme manifest
  const manifest = await modules[path]();

  // extract __dirname from path
  const __dirname = path.split("/").at(-2);

  // extract __filenames from cssFiles
  const __filenames = manifest.cssFiles.map((filename) => {
    // remove ".css" extension if any
    if (filename.endsWith(dotCSS)) {
      return filename.slice(0, filename.length - dotCSS.length);
    }
    return filename;
  });

  // build Theme & add to collection
  const theme = <Theme>{ ...manifest, __dirname, __filenames };
  collection.push(theme);
}

export default collection;
