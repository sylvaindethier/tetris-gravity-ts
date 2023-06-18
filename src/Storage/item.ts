import type { StorageItem } from "./types/StorageItem";

/**
 * Create a StorageItem
 * @param {!StorageItem["key"]} props.key The storage item key
 * @param {?StorageItem["__storage"]} [props.storage = localStorage] The storage, default to localStorage
 * @throws {Error} Whenever the `key` is an empty string
 * @returns {StorageItem} The StorageItem
 */
export function create({
  key,
  storage = localStorage,
}: {
  key: StorageItem["key"];
  storage?: StorageItem["__storage"];
}): StorageItem {
  key = key.trim();

  // `key` must not be empty string
  if (0 === key.length) {
    throw Error("`key` MUST NOT be empty string");
  }

  const item = <StorageItem>{
    key,
    __storage: storage,
  };

  // set storage item to `null` if not set
  if (undefined === item.__storage[item.key]) {
    item.__storage[item.key] = null;
  }

  return item;
}

/**
 * Get the storage item (string) value
 * @private
 * @param {!StorageItem} item The storage item
 * @returns {string} The storage item (string) value
 */
function __getString(item: StorageItem): string {
  // faster direct access
  return item.__storage[item.key];
}

/**
 * Set a storage item (string) value
 * @private
 * @param {!StorageItem} item The StorageItem
 * @param {!string} value The string value to set to storage item value
 * @throws {TypeError} Whenever the value is not string or "undefined" string
 */
function __setString(item: StorageItem, value: string) {
  if ("string" !== typeof value) {
    throw TypeError(`The value MUST be typeof string; typeof ${typeof value}`);
  }

  // prevents "undefined" as this value can't be JSON parsed
  if ("undefined" === value.trim()) {
    throw TypeError('The value MUST NOT be the "undefined" string');
  }

  // faster direct access
  item.__storage[item.key] = value;
}

/**
 * Remove the storage item
 * @param {!StorageItem} item The StorageItem to remove
 */
export function remove(item: StorageItem): void {
  // faster direct access
  delete item.__storage[item.key];
}

/**
 * Get the JSON parsed storage item value
 * @private
 * @param {!StorageItem} item The StorageItem
 * @returns {any} The JSON parsed storage item value
 */
function __getJSON(item: StorageItem): any {
  return JSON.parse(__getString(item));
}

/**
 * Set a value (JSON.stringify) to storage item
 * @private
 * @param {!StorageItem} item The StorageItem
 * @param {!any} value The value (JSON.stringify) to set to storage item
 */
function __setJSON(item: StorageItem, value: any): void {
  __setString(item, JSON.stringify(value));
}

/**
 * Get the storage item value
 * @param {!StorageItem} item The storage item
 * @returns {T} The storage item value
 */
export function getValue<T>(item: StorageItem): T {
  return __getJSON(item);
}

/**
 * Set a storage item value
 * @param {!StorageItem} item The storage item
 * @param {!T} value The storage item value to set
 */
export function setValue<T>(item: StorageItem, value: T): void {
  __setJSON(item, value);
}

/**
 * Returns the String value representation
 * @param {!StorageItem} item The storage item
 * @returns {string} The string value
 */
export function toString(item: StorageItem): string {
  return __getString(item);
}

/**
 * Returns the JSON value representation
 * @param {!StorageItem} item The storage item
 * @returns {any} The JSON value
 */
export function toJSON(item: StorageItem): any {
  return __getJSON(item);
}
