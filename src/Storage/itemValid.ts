import type { StorageItemValid} from "./types/StorageItemValid";

import * as $item from "./item";
export * from "./item";

/**
 * Create a StorageItemValid<T>
 * @param {!StorageItemValid<T>["key"]} props.key The storage item key
 * @param {!StorageItemValid<T>["isValid"]} props.isValid The storage item value function validator
 * @param {?StorageItemValid<T>["__storage"]} props.storage The storage
 * @returns {StorageItemValid<T>} The StorageItemValid<T>
 */
export function create<T>({
  isValid,
  ...props
}: {
  key: StorageItemValid<T>["key"];
  isValid: StorageItemValid<T>["isValid"];
  storage?: StorageItemValid<T>["__storage"];
}): StorageItemValid<T> {
  const __item = $item.create(props);

  const item = <StorageItemValid<T>>{
    ...__item,
    isValid,
  };

  return item;
}

/**
 * Get a storage item value
 * @param {!StorageItemValid<T>} item The storage item to get the value
 * @returns {T} The storage item value
 */
export function getValue<T>(item: StorageItemValid<T>): T {
  return $item.getValue(item);
}

/**
 * Set a valid storage item value
 * @param {!StorageItemValid<T>} item The storage item
 * @param {!T} value The value to set to the storage item
 * @throws {Error} Whenever the value is not valid
 */
export function setValue<T>(item: StorageItemValid<T>, value: T): void {
  if (!item.isValid(value)) {
    throw Error(`value (${typeof value}) "${value}" is NOT valid`);
  }
  $item.setValue(item, value);
}
