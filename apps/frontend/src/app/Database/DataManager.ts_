import { DataManagerBase, Database } from "@genshin-builder/database"
import { IGOOD, IGenshinBuilder, ImportResult } from "./Database"

export class DataManager<
  CacheKey extends string,
  DataKey extends string, /** WEAPON / ARTIFACT / CHARACTER / META */
  CacheValue extends StorageValue,  /** ICahcedWeapon */
  StorageValue,  /** IWeapon */
  DatabaseType extends Database /** GenshinBuilderDatabase */
> extends DataManagerBase<
  CacheKey,
  DataKey, 
  CacheValue,
  StorageValue,
  DatabaseType 
> {
  importGOOD(data: IGOOD & IGenshinBuilder, resultContainer: ImportResult) { 
    const entries = data[this.dataKey]

    // If entries exist -> load them to the storages
    if (entries && Array.isArray(entries)) {
      entries.forEach(item => item.id && this.set(item.id, item))
    }
   }
  exportGOOD(data: Partial<IGOOD & IGenshinBuilder>) { 
    const entries = Object.entries(this.data) 

    // De cache each entry and load to -> data
    data[this.dataKey] = entries.map(([id, value]) => ({...this.deCache(value as CacheValue), id}))
   }
}
