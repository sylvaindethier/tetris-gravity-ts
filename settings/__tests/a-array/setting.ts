import Setting from "@/Setting.js";
import defaultValue from "./default.json";


class Setting_A_Array extends Setting<Array<any>> {
  protected applyValue(value: Array<any>): void {
    document.documentElement.dataset["aArray"] = value.toString();
  }
}

const setting = new Setting_A_Array("tests.a-array", defaultValue);
export default setting;
