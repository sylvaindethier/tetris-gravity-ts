import Setting from "@/Setting.js";
import defaultValue from "./default.json";

class Setting_A_String extends Setting<string> {
  protected applyValue(value: string): void {
    document.documentElement.dataset["aString"] = value;
  }

  valueOf(): string {
    return this.value;
  }
}

const setting = new Setting_A_String("tests.a-string", defaultValue);
export default setting;
