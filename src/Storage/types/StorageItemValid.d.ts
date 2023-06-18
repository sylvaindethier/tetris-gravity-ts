import type { StorageItem } from "./StorageItem";

/**
 * StorageItemValid<T>
 * @type
 */
export type StorageItemValid<T> = StorageItem & {
  /**
   * The function that validate a value
   * @readonly
   * @type {(value: T) => boolean}
   */
  readonly isValid: (value: T) => boolean;
};
