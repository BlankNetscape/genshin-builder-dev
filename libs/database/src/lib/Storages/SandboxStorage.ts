/* eslint-disable @typescript-eslint/no-explicit-any */
import { StorageSlot, database_index_key, database_version_key } from '../common'
import type { DatabaseStorage } from '../databaseStorage'

export class SandboxStorage implements DatabaseStorage {
  protected storage: Record<string, string> = {}

  constructor(obj?: Record<string, string>) {
    if (obj) this.storage = obj
  }

  // Implementation
  get keys(): string[] {
    return Object.keys(this.storage)
  }
  get entries(): [key: string, value: string][] {
    return Object.entries(this.storage)
  }
  get(key: string) {
    const string = this.storage[key]
    if (!string) return undefined
    try {
      return JSON.parse(string)
    } catch {
      delete this.storage[key]
      return undefined
    }
  }
  set(key: string, value: any): void {
    this.storage[key] = JSON.stringify(value)
  }
  getString(key: string): string | undefined {
    return this.storage[key]
  }
  setString(key: string, value: string): void {
    this.storage[key] = value
  }
  remove(key: string): void {
    delete this.storage[key]
  }
  removeForKeys(shouldRemove: (key: string) => boolean): void {
    this.storage = Object.fromEntries(Object.entries(this.storage).filter(([key]) => !shouldRemove(key)))
  }
  clear(): void {
    this.storage = {}
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
