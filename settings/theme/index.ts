// CSS
import "./index.css";

// App
import * as app from "@/app";
// @TODO: Remove
console.info("./settings/theme/index", { app });
import * as $setting from "@/Setting/setting";

// 
const form = document.querySelector<HTMLFormElement>("#setting-theme");
const select = document.querySelector<HTMLSelectElement>(
  "#setting-theme > select"
);

// create <option> HTMLElement for each theme
const settingTheme = app.settings.theme;
const themeValue = $setting.getValue(settingTheme);
const htmlOptions = settingTheme.collection.map((theme) => {
  const option = <HTMLOptionElement>document.createElement("option");
  option.value = theme.value;
  if (themeValue === theme.value) {
    option.selected = true;
  }
  option.text = theme.text;
  return option;
});
select!.append(...htmlOptions);

form!.addEventListener("input", () => {
  $setting.setValue(settingTheme, select!.value);
});
