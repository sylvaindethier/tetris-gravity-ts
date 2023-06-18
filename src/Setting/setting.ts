import type { Setting, ISetting } from "./types/Setting";

import * as $item from "@/Storage/itemDefault";
export * from "@/Storage/itemDefault";

/**
 * Create the Setting<TSetting, T>
 * @param {!Setting<TSetting, T>["key"]} props.key The setting storage item key
 * @param {!Setting<TSetting, T>["defaultValue"]} props.defaultValue The setting default value
 * @param {!Setting<TSetting, T>["collection"]} props.collection The setting collection
 * @param {!Setting<TSetting, T>["use"]} props.use The setting use function
 * @param {?Setting<TSetting, T>["__storage"]} [props.storage] The storage
 * @returns {Setting<TSetting, T>}
 */
export function create<TSetting extends ISetting<T>, T>({
  collection,
  use,
  ...props
}: {
  key: Setting<TSetting, T>["key"];
  defaultValue: Setting<TSetting, T>["defaultValue"];
  collection: Setting<TSetting, T>["collection"];
  use: Setting<TSetting, T>["use"];
  storage?: Setting<TSetting, T>["__storage"];
}): Setting<TSetting, T> {
  // define the value validation function
  const isValid = (value: T) => undefined !== __findByValue(collection, value);

  // create the setting
  const item = $item.create({
    ...props,
    isValid,
  });
  const setting = <Setting<TSetting, T>>{
    ...item,
    collection,
    use,
  };

  // use the setting
  setting.use(get(setting));

  return setting;
}

/**
 * Find a setting whose 'value' property equals a value
 * @private
 * @param {!Setting<TSetting, T>["collection"]} collection The setting collection
 * @param {!T} value The value to find
 * @returns {TSetting | undefined} The setting element if any
 */
function __findByValue<TSetting extends ISetting<T>, T>(
  collection: Setting<TSetting, T>["collection"],
  value: T
): TSetting | undefined {
  return collection.find((setting) => value === setting.value);
}

/**
 * Get the setting from the collection by its current value
 * @param {!Setting<TSetting, T>} setting The setting
 * @throws {Error} Whenever the current setting is undefined
 * @returns {TSetting} The current setting
 */
export function get<TSetting extends ISetting<T>, T>(
  setting: Setting<TSetting, T>
): TSetting {
  const value = getValue(setting);
  const el = __findByValue(setting.collection, value);
  if (undefined === el) {
    throw Error(`Setting not found with 'value': (${typeof value}) "${value}"`);
  }
  return el;
}

/**
 * Get the setting value
 * @param {!Setting<TSetting, T>} setting The setting
 * @returns {T} The setting value
 */
export function getValue<TSetting extends ISetting<T>, T>(
  setting: Setting<TSetting, T>
): T {
  return $item.getValue(setting);
}

/**
 * Set the setting value
 * @param {!Setting<TSetting, T>} setting The setting
 * @param {!T} value The value to set
 */
export function setValue<TSetting extends ISetting<T>, T>(
  setting: Setting<TSetting, T>,
  value: T
): void {
  $item.setValue(setting, value);

  // use the setting
  setting.use(get(setting));
}
