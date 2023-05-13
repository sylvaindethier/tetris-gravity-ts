/**
 * StorageItem
 * @interface
 */
export interface StorageItem<T> {
  /**
   * The storage item key
   * @readonly
   */
  readonly key: string;

  /**
   * The storage
   * @readonly
   * @private
   */
  readonly #storage: Storage;

  /**
   * The storage item string value
   * @private
   */
  private #item: string;

  /**
   * Get the storage item string value
   * @private
   * @returns {string} The storage item string value
   */
  get #item(): string;

  /**
   * Set the storage item string value
   * @private
   * @param {!string} value The string value to set to storage item
   * @throws {TypeError} Whenever the `value` is "undefined" string
   */
  set #item(value: string);

  /**
   * Remove the storage item string value
   * @protected
   */
  // CAN NOT mark as @protected in interface, interpreted as @public
  // protected remove(): void;

  /**
   * The storage item json value
   * @private
   */
  private #json: any;

  /**
   * Get the storage item json value
   * @private
   * @returns {any} The storage item json value
   */
  get #json(): any;

  /**
   * Set the storage item json value
   * @private
   * @param {any} value The json value to set to storage item
   */
  set #json(value: any);

  /**
   * The storage item value
   */
  declare value: T;

  /**
   * Get the storage item value
   * @returns {T} The storage item value
   */
  // get value(): T;

  /**
   * Set the storage item value
   * @param {T} value The value to set to the storage item value
   */
  // set value(value: T);

  /**
   * Returns the value JSON representation
   * @returns {any} The JSON value
   */
  toJSON(): any;

  /**
   * Returns the value String representation
   * @returns {string} The string value
   */
  toString(): string;
}

/**
 * StorageItem
 * @type
 */
export type StorageItem<T> = {
  prototype: StorageItem<T>;

  /**
   * Construct the instance
   * @param {!string} key The storage item key
   * @param {?Storage} [storage = localStorage] The storage, default to `localStorage`
   * @throws {TypeError} Whenever the `key` is an empty string
   */
  new (key: string, storage?: Storage): StorageItem<T>;
};
