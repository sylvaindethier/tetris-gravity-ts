import type { StorageItemValid } from "./StorageItemValid";

/**
 * StorageItemDefault<T>
 * @type
 */
export type StorageItemDefault<T> = StorageItemValid<T> & {
  /**
   * The default value
   * @readonly
   * @type {T}
   */
  readonly defaultValue: T;
};
