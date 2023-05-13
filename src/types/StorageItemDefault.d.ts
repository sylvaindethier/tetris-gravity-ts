import type { StorageItem } from "./StorageItem.d.ts";

/**
 * StorageItemDefault
 * @interface
 */
export interface StorageItemDefault<T> extends StorageItem<T> {
  /**
   * The storage item default value
   */
  readonly defaultValue: T;

  declare value: T;

  /**
   * Reset the storage item value to default value
   */
  reset(): void;
}

/**
 * StorageItemDefault
 * @type
 */
export type StorageItemDefault<T> = {
  prototype: StorageItemDefault<T>;

  /**
   * Construct the instance
   * @param {!string} key The storage item key
   * @param {!T} defaultValue The default value
   * @param {?Storage} [storage] The storage
   */
  new (key: string, defaultValue: T, storage?: Storage): StorageItemDefault<T>;
};
