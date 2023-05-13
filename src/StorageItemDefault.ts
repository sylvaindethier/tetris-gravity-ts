import type { StorageItemDefault as IStorageItemDefault } from "./types/StorageItemDefault.d.ts";
import StorageItem from "./StorageItem.ts";

/**
 * @typedef {import("./types/StorageItemDefault.d.ts").StorageItemDefault} IStorageItemDefault
 */

/**
 * StorageItemDefault
 * @class
 */
export default class StorageItemDefault<T>
  extends StorageItem<T>
  implements IStorageItemDefault<T>
{
  /**
   * The storage item default value
   */
  readonly defaultValue: T;

  /**
   * Construct the instance
   * @param {!string} key The storage item key
   * @param {!T} defaultValue The default value
   * @param {?Storage} [storage] The storage, default to `localStorage`
   * @throws {TypeError} Whenever the `key` is an empty string
   */
  constructor(key: string, defaultValue: T, storage?: Storage) {
    super(key, storage);
    this.defaultValue = defaultValue;

    if (null === this.value) {
      this.reset();
    }
  }

  /**
   * Reset the storage item value to default value
   */
  reset(): void {
    this.value = this.defaultValue;
  }
}
