// CSS
import "./index.css";

// App
import * as app from "@/app";
// @TODO: Remove
console.info("./settings/theme/index", { app });
import * as $setting from "@/Setting/setting";

// 
const form = document.querySelector<HTMLFormElement>("#setting-lang");
const select = document.querySelector<HTMLSelectElement>(
  "#setting-lang > select"
);

// create <option> HTMLElement for each lang
const settingLang = app.settings.i18n;
const langValue = $setting.getValue(settingLang);
const htmlOptions = settingLang.collection.map((lang) => {
  const option = <HTMLOptionElement>document.createElement("option");
  option.value = lang.value;
  if (langValue === lang.value) {
    option.selected = true;
  }
  option.text = lang.text;
  return option;
});
select!.append(...htmlOptions);

form!.addEventListener("input", () => {
  $setting.setValue(settingLang, select!.value);
});
