import { DatabaseStorage } from './databaseStorage'

export class Database {
  storage: DatabaseStorage

  constructor(storage: DatabaseStorage) {
    this.storage = storage
  }
}
