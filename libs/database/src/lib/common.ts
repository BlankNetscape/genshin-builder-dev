export type StorageSlot = 1 | 2 | 3 | 4
export type TriggerString = 'update' | 'remove' | 'new' | 'invalid'

export const database_index_key = 'dbIndex'
export const database_version_key = 'db_ver'

export function deepFreeze<T>(obj: T, layers = 5): T {
  if (layers === 0) return obj
  if (typeof obj === 'object')
    Object.values(Object.freeze(obj)).forEach((o) => deepFreeze(o, layers--))
  return obj
}
