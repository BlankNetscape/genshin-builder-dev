/* eslint-disable @typescript-eslint/no-explicit-any */
import { StorageSlot, database_index_key, database_version_key } from '../common'
import type { DatabaseStorage } from '../databaseStorage'



export class LocalStorage implements DatabaseStorage {
  private storage: Storage

  constructor(storage: Storage) {
    this.storage = storage
  }

  get keys(): string[] {
    return Object.keys(this.storage)
  }

  get entries(): [key: string, value: string][] {
    return Object.entries(this.storage)
  }

  // Implementation
  get(key: string) {
    const entry = this.storage.getItem(key)
    if (!entry) return undefined
    try {
      return JSON.parse(entry)
    } catch {
      this.storage.removeItem(key)
      return undefined
    }
  }
  set(key: string, value: any): void {
    this.storage.setItem(key, JSON.stringify(value))
  }
  getString(key: string): string | undefined {
    return this.storage.getItem(key) ?? undefined
  }
  setString(key: string, value: string): void {
    this.storage.setItem(key, value)
  }
  remove(key: string): void {
    this.storage.removeItem(key)
  }
  removeForKeys(shouldRemove: (key: string) => boolean): void {
    for (const key in this.storage) {
      if (shouldRemove(key)) this.storage.removeItem(key)
    }
  }
  clear(): void {
    this.storage.clear()
  }
  copyFrom(other: DatabaseStorage): void {
    for (const [key, value] of other.entries) {
      this.setString(key, value)
    }
  }
  getVersion(): number {
    return parseInt(this.getString(database_version_key) ?? '0')
  }
  setVersion(version: number): void {
    this.setString(database_version_key, version.toString())
  }
  getIndex(): StorageSlot {
    return parseInt(this.getString(database_index_key) ?? '1') as StorageSlot
  }
  setIndex(i: StorageSlot): void {
    this.setString(database_index_key, i.toString())
  }
}
