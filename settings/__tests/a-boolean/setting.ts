import Setting from "@/Setting.js";
import defaultValue from "./default.json";

class Setting_A_Boolean extends Setting<boolean> {
  protected applyValue(value: boolean): void {
    document.documentElement.dataset["aBoolean"] = String(value);
  }

  valueOf(): boolean {
    return this.value;
  }
}

const setting = new Setting_A_Boolean("tests.a-boolean", defaultValue);
export default setting;
