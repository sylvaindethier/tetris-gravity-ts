import setting from "./setting.ts";

const form = document.querySelector<HTMLFormElement>("#setting-tests-a-string");
const input = document.querySelector<HTMLInputElement>("#setting-tests-a-string > input");

/****************************************/
/*********** form HTMLElement ***********/
/****************************************/
// set input.value to setting.value
input!.value = setting.value;

form!.addEventListener("input", () => {
  // set setting.value to input.value
  setting.value = input!.value;
});
