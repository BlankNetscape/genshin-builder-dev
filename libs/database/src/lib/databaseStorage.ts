/* eslint-disable @typescript-eslint/no-explicit-any */
import { StorageSlot } from './common'

export interface DatabaseStorage {
  keys: string[]
  entries: [key: string, value: string][]

  get(key: string): any | undefined
  set(key: string, value: any): void

  getString(key: string): string | undefined
  setString(key: string, value: string): void

  remove(key: string): void
  removeForKeys(shouldRemove: (key: string) => boolean): void

  clear(): void

  copyFrom(other: DatabaseStorage): void

  getVersion(): number
  setVersion(version: number): void
  getIndex(): StorageSlot
  setIndex(i: StorageSlot): void
}
