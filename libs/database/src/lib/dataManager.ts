/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TriggerString, deepFreeze } from './common'
import { Database } from './database'

type Callback<Arg> = (key: Arg, reason: TriggerString, object: any) => void

export class DataManagerBase<
  CacheKey extends string, 
  DataKey extends string, 
  CacheValue extends StorageValue, 
  StorageValue, 
  DatabaseType extends Database
> {
  database: DatabaseType
  dataKey: DataKey
  data: Partial<Record<CacheKey, CacheValue>> = {}
  listeners: Partial<Record<CacheKey, Callback<CacheKey>[]>> = {}
  anyListeners: Callback<CacheKey>[] = []

  constructor(database: DatabaseType, dataKey: DataKey) {
    this.database = database
    this.dataKey = dataKey
  }

  // Accesor methods
  get keys() {
    return Object.keys(this.data)
  }
  get values() {
    return Object.values(this.data)
  }

  /** Gets cache value from DataManager. */
  getCacheValue(key: CacheKey | '' | undefined): CacheValue | undefined {
    return key ? this.data[key] : undefined
  }

  /** Gets value from storage. */
  getStorageValue(key: CacheKey): StorageValue {
    return this.database.storage.get(this.toStorageKey(key))
  }

  /** (actually prepares the entry) Push new entry to DataManager storage @param key  @param x value or function @param notify default -> true*/
  set(
      key: CacheKey, 
      x: Partial<StorageValue> | ((v: StorageValue) => Partial<StorageValue> | void), // value or function
      notify = true
    ): boolean {

    const old = this.getStorageValue(key)

    if (typeof x === 'function' && !old) {
      this.trigger(key, x, 'invalid')
      return false
    }

    const value = typeof x === 'function' ? x(old) ?? old : x
    const validated = this.validate({
      ...(old ?? {}),
      ...value,
    })

    if (!validated) {
      this.trigger(key, value, 'invalid')
      return false
    }

    const cached = this.toCache(validated, key)

    if (!cached) {
      this.trigger(key, value, 'invalid')
      return false
    }

    // If the value doesn't exist in storage 
    if (!old && notify) this.trigger(key, cached, 'new')

    this.setCachedEntry(key, cached)

    return true
  }

  /** Base set prepared cached entry */
  setCachedEntry(key: CacheKey, cached: CacheValue) {
    deepFreeze(cached)
    this.data[key] = cached
    this.setStorageEntry(key, cached)
    this.trigger(key, cached, 'update')
  }

  setStorageEntry(key: CacheKey, cached: CacheValue) {
    this.database.storage.set(this.toStorageKey(key), this.deCache(cached))
  }

  /** Removes entry from DataManager and storage */
  remove(key: CacheKey, notify = true) {
    const rem = this.data[key]
    delete this.data[key]
    this.removeStorageEntry(key)

    if (notify) this.trigger(key, rem, 'remove')
    delete this.listeners[key]
  }

  /** Removes all entries from DataManager and storage */
  clear() {
    for (const key in this.data) {
      this.remove(key)
    }
  }

  removeStorageEntry(key: CacheKey) {
    this.database.storage.remove(this.toStorageKey(key))
  }
  
  /** Removes all entris from Datamanger to storage */
  clearStorage() {
    for (const key in this.data) this.removeStorageEntry(key)
  }

  /** Save all entris from Datamanger to storage */
  saveStorage() {
    Object.entries(this.data).forEach(([k, v]) => this.setStorageEntry(k as CacheKey, v as CacheValue))
  }

  // Converters
  toStorageKey(key: CacheKey): string {
    return key
  }

  toCache(storageObj: StorageValue, id: CacheKey): CacheValue | undefined {
    return {
      id,
      ...storageObj,
    } as CacheValue
  }

  deCache(cacheObj: CacheValue): StorageValue {
    const { id, ...storageObj } = cacheObj as any
    return storageObj
  }

  validate(obj: unknown): StorageValue | undefined {
    return obj as StorageValue
  }

  // Event related
  followAny(callback: Callback<CacheKey>): () => void {
    this.anyListeners.push(callback)
    return () => {
      this.anyListeners = this.anyListeners.filter((cb) => cb !== callback)
    }
  }

  follow(key: CacheKey, callback: Callback<CacheKey>) {
    if (this.listeners[key]) this.listeners[key]?.push(callback)
    else this.listeners[key] = [callback]
    return () => {
      this.listeners[key] = this.listeners[key]?.filter((cb) => cb !== callback)
      if (!this.listeners[key]?.length) delete this.listeners[key]
    }
  }

  /**
   * Triggers events
   * @param key 
   * @param reason 
   * @param object 
   */
  trigger(key: CacheKey, object: any, reason: TriggerString) {
    this.listeners[key]?.forEach((callback) => callback(key, reason, object))
    this.anyListeners.forEach((callback) => callback(key, reason, object))
  }

  // Utils
  changeId(oldKey: CacheKey, newKey: CacheKey, notify = false): boolean {
    /**
     * Will fail if
     *   oldKey == newKey
     *   data[oldKey] doesnt exist
     *   data[newKey] exists
     *   setting data[newKey] fails.
     */
    if (oldKey === newKey) return false
    const value = this.getCacheValue(oldKey)
    if (!value) return false
    if (this.getCacheValue(newKey)) return false
    if (!this.set(newKey, value, notify)) return false
    this.remove(oldKey, notify)
    return true
  }

  get keySingle() {
    if (this.dataKey.endsWith('s')) return this.dataKey.slice(0, -1)
    return this.dataKey
  }

  generateKey(keys: Set<string> = new Set(this.keys)): string {
    let ind = keys.size
    let candidate = ''
    do {
      candidate = `${this.keySingle}_${ind++}`
    } while (keys.has(candidate))
    return candidate
  }
  
  
}
