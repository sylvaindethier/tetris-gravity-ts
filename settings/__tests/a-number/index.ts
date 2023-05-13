import setting from "./setting.ts";

const form = document.querySelector<HTMLFormElement>("#setting-tests-a-number");
const input = document.querySelector<HTMLInputElement>("#setting-tests-a-number > input");

/****************************************/
/*********** form HTMLElement ***********/
/****************************************/
// set input.value to (string) setting.value
input!.value = setting.value.toString();

form!.addEventListener("input", () => {
  // set setting.value to (number) input.value
  setting.value = parseInt(input!.value);
});
