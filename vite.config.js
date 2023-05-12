import path, { resolve } from "path";
import { glob } from "glob";
import { defineConfig } from "vite";

// match all HTML files unless from "dist" & "node_modules"
const htmlFiles = glob.sync("**/*.html", {
  ignore: ["dist/**", "node_modules/**"],
});
const inputEntries = htmlFiles.map((file) => [
  // entry key: filename without extension
  file.slice(0, file.length - path.extname(file).length),

  // entry value: resolved file path
  resolve(__dirname, file),
]);

export default defineConfig({
  base: "/tetris-ts/",
  build: {
    rollupOptions: {
      input: Object.fromEntries(inputEntries),
    },
  },
});
