import type { StorageItemDefault } from "./types/StorageItemDefault";

import * as $item from "./itemValid";
export * from "./itemValid";

/**
 * Create a StorageItemDefault<T>
 * @param {!StorageItemDefault["key"]} props.key The storage item key
 * @param {!StorageItemDefault<T>["defaultValue"]} props.defaultValue The storage item default value
 * @param {!StorageItemDefault<T>["isValid"]} props.isValid The storage item value function validator
 * @param {?StorageItemDefault["__storage"]} props.storage The storage
 * @returns {StorageItemDefault<T>} The StorageItemDefault<T>
 */
export function create<T>({
  defaultValue,
  ...props
}: {
  key: StorageItemDefault<T>["key"];
  defaultValue: StorageItemDefault<T>["defaultValue"];
  isValid: StorageItemDefault<T>["isValid"];
  storage?: StorageItemDefault<T>["__storage"];
}): StorageItemDefault<T> {
  const __item = $item.create(props);

  // validate & set the default value
  if (!__item.isValid(defaultValue)) {
    throw Error(`default value (${typeof defaultValue}) "${defaultValue}" is NOT valid`);
  }
  const item = <StorageItemDefault<T>>{
    ...__item,
    defaultValue,
  };

  // reset if the value is null
  if (null === $item.getValue(item)) {
    reset(item);
  }

  return item;
}

/**
 * Reset the storage item value to default value
 * @param {!StorageItemDefault<T>} item The storage item
 */
export function reset<T>(item: StorageItemDefault<T>): void {
  $item.setValue(item, item.defaultValue);
}
