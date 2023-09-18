import { DataManagerBase, Database } from "@genshin-builder/database"
import { IGOOD, ImportResult } from "../Database"

export class DataManager<
  CacheKey extends string,
  DataKey extends string,
  CacheValue extends StorageValue,
  StorageValue,
  DatabaseType extends Database
> extends DataManagerBase<
  CacheKey,
  DataKey,
  CacheValue,
  StorageValue,
  DatabaseType
> {
  exportGOOD(good: Partial<IGOOD>) { return }
  importGOOD(good: IGOOD, resultContainer: ImportResult) { return }
}
