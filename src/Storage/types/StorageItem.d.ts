/**
 * StorageItem
 * @type
 */
export type StorageItem = {
  /**
   * The key to the storage item
   * @readonly
   * @type {string}
   */
  readonly key: string;

  /**
   * The storage that will hold the key/value
   * @private
   * @readonly
   */
  readonly __storage: Storage;
};
