import type { StorageItemDefault } from "./StorageItemDefault.d.ts";

/**
 * Setting
 * @interface
 */
export abstract interface Setting<T> extends StorageItemDefault<T> {
  /**
   * The setting name
   */
  readonly name: string;

  declare value: T;

  /**
   * Apply setting value
   * @private
   * @param {!T} value The value to apply
   */
  // protected abstract applyValue(value: T): void;
}

/**
 * Setting
 * @type
 */
export type Setting<T> = {
  prototype: Setting<T>;

  /**
   * Construct the instance
   * @param {!string} name The setting name
   * @param {!T} defaultValue The default value
   * @param {?Storage} [storage] The storage
   */
  new (name: string, defaultValue: T, storage?: Storage): Setting<T>;
};
