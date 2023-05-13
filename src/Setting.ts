import type { Setting as ISetting } from "./types/Setting.d.ts";
import StorageItemDefault from "./StorageItemDefault.ts";

/**
 * @typedef {import("./types/Setting.d.ts").Setting} ISetting
 */

/**
 * Setting
 * @class
 */
export default abstract class Setting<T> extends StorageItemDefault<T> implements ISetting<T> {
  /**
   * The setting name
   */
  readonly name: string;

  /**
   * Construct the instance
   * @param {!string} name The setting name
   * @param {!T} defaultValue The default value
   * @param {?Storage} [storage] The storage, default to `localStorage`
   * @throws {TypeError} Whenever the `name` is an empty string
   */
  constructor(name: string, defaultValue: T, storage?: Storage) {
    // `name` must not be empty string
    name = name.trim();
    if (0 === name.length) {
      throw new TypeError("`name` MUST NOT be empty");
    }

    super(`setting.${name}`, defaultValue, storage);
    this.name = name;

    this.applyValue(this.value);
  }

  /**
   * Get the value
   * @returns {T} The setting value
   */
  get value(): T {
    return super.value;
  }

  /**
   * Set the value
   * @param {!T} value The setting value to set
   */
  set value(value: T) {
    super.value = value;
    this.applyValue(value);
  }

  protected abstract applyValue(value: T): void;
}
