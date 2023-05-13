import Setting from "@/Setting.js";
import defaultValue from "./default.json";

class Setting_A_Number extends Setting<number> {
  protected applyValue(value: number): void {
    document.documentElement.dataset["aNumber"] = String(value);
  }

  valueOf(): number {
    return this.value;
  }
}

const setting = new Setting_A_Number("tests.a-number", defaultValue);
export default setting;
