import { TriggerString, deepFreeze } from './common'
import { Database } from './database'

type Callback<Obj> = (reason: TriggerString, object: Obj) => void

export class DataEntryBase<Key extends string, CacheValue, StorageValue> {
  database: Database
  init: (database: Database) => StorageValue
  data: CacheValue
  key: Key
  listeners: Callback<CacheValue>[] = []

  constructor(
        database: Database, 
        key: Key, 
        init: (database: Database) => StorageValue
  ) {
    this.database = database
    this.key = key
    this.init = init
    const storageVal = this.getStorageValue()
    if (storageVal) this.setValue(storageVal)
    else this.setValue(init(this.database))
    this.data = this.getValue() //initializer
  }

  // Accesor methods
  getValue() {
    return this.data
  }

  getStorageValue(): StorageValue {
    return this.database.storage.get(this.key)
  }

  setValue(
    x: Partial<StorageValue> | ((v: StorageValue) => Partial<StorageValue> | void)
  ): boolean {
    const old = this.getStorageValue()

    if (typeof x === 'function' && !old) {
      this.trigger('invalid', x)
      return false
    }

    const value = typeof x === 'function' ? x(old) ?? old : x
    const validated = this.validate({ ...old, ...value })

    if (!validated) {
      this.trigger('invalid', value)
      return false
    }
    
    const cached = this.toCache(validated)

    if (!cached) {
      this.trigger('invalid', value)
      return false
    }

    if (!old) this.trigger('new', cached)

    this.setCached(cached)

    return true
  }

  /** Base -> set prepared cached value */
  setCached(cached: CacheValue) {
    deepFreeze(cached)
    this.data = cached
    this.database.storage.set(this.key, this.deCache(cached))
    this.trigger('update', cached)
  }

  clear() {
    const data = this.toCache(this.init(this.database))
    if (!data) return
    this.data = data
    this.setCached(this.data)
    this.listeners = []
  }

  clearStorage() {
    this.database.storage.remove(this.key)
  }

  saveStorage() {
    this.database.storage.set(this.key, this.deCache(this.data))
  }

  // Converters
  validate(obj: unknown): StorageValue | undefined {
    return obj as StorageValue | undefined
  }
  toCache(storageObj: StorageValue): CacheValue | undefined {
    return { ...storageObj } as unknown as CacheValue
  }
  deCache(cacheObj: CacheValue): StorageValue {
    const { ...storageObj } = cacheObj
    return storageObj as unknown as StorageValue
  }
  
  // Event related
  trigger(reason: TriggerString, object?: unknown) {
    this.listeners.forEach((cb) => cb(reason, object as CacheValue))
  }

  // Utils
  follow(callback: Callback<CacheValue>) {
    this.listeners.push(callback)
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback)
    }
  }
}
