import setting from "./setting.ts";

const form = document.querySelector<HTMLFormElement>("#setting-tests-a-boolean");
const input = document.querySelector<HTMLInputElement>("#setting-tests-a-boolean > input");

/****************************************/
/*********** form HTMLElement ***********/
/****************************************/
// set input.checked to setting.value
input!.checked = setting.value;

form!.addEventListener("input", () => {
  // set setting.value to input.checked
  setting.value = input!.checked;
});
