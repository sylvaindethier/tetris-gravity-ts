import type { StorageItem as IStorageItem } from "./types/StorageItem.d.ts";

/**
 * @typedef {import("./types/StorageItem.d.ts").StorageItem} IStorageItem
 */

/**
 * StorageItem
 * @class
 */
export default class StorageItem<T> implements IStorageItem<T> {
  /**
   * The storage item key
   * @readonly
   */
  readonly key: string;

  /**
   * The storage
   * @private
   * @readonly
   */
  readonly #storage: Storage;

  /**
   * Construct the instance
   * @param {!string} key The storage item key
   * @param {?Storage} [storage = localStorage] The storage, default to `localStorage`
   * @throws {TypeError} Whenever the `key` is an empty string
   */
  constructor(key: string, storage: Storage = localStorage) {
    // `key` must not be empty string
    key = key.trim();
    if (0 === key.length) {
      throw new TypeError("`key` MUST NOT be empty");
    }

    this.key = key;
    this.#storage = storage;

    // set storage item to `null` if not set
    if (undefined === this.#storage[this.key]) {
      this.#storage[this.key] = null;
    }
  }

  /**
   * Get the storage item (string value)
   * @private
   * @returns {string} The storage item (string value)
   */
  get #item(): string {
    // faster direct access
    return this.#storage[this.key];
  }

  /**
   * Set the storage item (string value)
   * @private
   * @param {!string} value The string value to set to storage item
   * @throws {TypeError} Whenever the `value` is not string or "undefined" string
   */
  set #item(value: string) {
    if ("string" !== typeof value) {
      throw new TypeError("The `value` MUST be string");
    }

    value = value.trim();
    // prevents "undefined" as this value can't be JSON parsed
    if ("undefined" === value) {
      throw new TypeError("The `value` MUST NOT be the 'undefined' string");
    }

    // faster direct access
    this.#storage[this.key] = value;
  }

  /**
   * Remove the storage item
   * @protected
   */
  protected remove(): void {
    // faster direct access
    delete this.#storage[this.key];
  }

  /**
   * Get the JSON parsed storage item
   * @returns {any} The JSON parsed storage item
   */
  get #json(): any {
    return JSON.parse(this.#item);
  }

  /**
   * Set the JSON stringified value to storage item
   * @param {!any} value The value to stringify to storage item
   */
  set #json(value: any) {
    this.#item = JSON.stringify(value);
  }

  /**
   * Get the storage item value
   * @returns {T} The storage item value
   */
  get value(): T {
    return this.#json;
  }

  /**
   * Set the storage item value
   * @param {!T} value The storage item value to set
   */
  set value(value: T) {
    this.#json = value;
  }

  /**
   * Returns the String value representation
   * @returns {string} The string value
   */
  toString(): string {
    return this.#item;
  }

  /**
   * Returns the JSON value representation
   * @returns {any} The JSON value
   */
  toJSON(): any {
    return this.#json;
  }
}
