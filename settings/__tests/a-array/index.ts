import setting from "./setting.ts";

const form = document.querySelector<HTMLFormElement>("#setting-tests-a-array");
const input = document.querySelector<HTMLInputElement>("#setting-tests-a-array > input");

/****************************************/
/*********** form HTMLElement ***********/
/****************************************/
// set input.value to (string) setting.value
input!.value = setting.value.toString();

form!.addEventListener("input", () => {
  // set setting.value to input.value
  const inputValue = input!.value;
  setting.value = inputValue.split(",");
});
