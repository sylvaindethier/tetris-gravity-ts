// type StorageItemDefault<T> = import("@/Storage/types/StorageItemDefault").StorageItemDefault<T>;
import type { StorageItemDefault } from "@/Storage/types/StorageItemDefault";

/**
 * ISetting<T>
 * @interface
 */
export interface ISetting<T> {
  /**
   * The setting value
   * @readonly
   * @type {T}
   */
  readonly value: T;
}

/**
 * Setting<TSetting, T>
 * @type
 */
export type Setting<TSetting extends ISetting<T>, T> = StorageItemDefault<T> & {
  /**
   * The setting collection
   * @readonly
   * @type {TSetting[]}
   */
  readonly collection: TSetting[];

  /**
   * Use the current setting
   * @param {TSetting} setting The current setting
   */
  readonly use: (setting: TSetting) => void;
};

