import { DataManagerBase, Database, DatabaseStorage, StorageSlot } from '@genshin-builder/database'
import { IArtifact, ICharacter, IWeapon } from '@genshin-builder/datamodel'
import { WeaponsDataManager } from './DataManagers/WeponManager'
import { ArtifactDataManager } from './DataManagers/ArtifactManager'

export type ImportResult = {
  type: 'GOOD'
  source: string
  artifacts: ImportResultCounter<IArtifact>
  weapons: ImportResultCounter<IWeapon>
  characters: ImportResultCounter<ICharacter>
  keepNotInImport: boolean
  ignoreDups: boolean
}

type ImportResultCounter<T> = {
  import: number // total # in filte
  new: T[]
  update: T[] // Use new object
  unchanged: T[] // Use new onject
  upgraded: T[]
  remove: T[]
  invalid: T[]
  notInImport: number
  beforeMerge: number
}

function newImportResult(source: string, keepNotInImport: boolean, ignoreDups: boolean): ImportResult {
  return {
    type: 'GOOD',
    source,
    artifacts: newCounter(),
    weapons: newCounter(),
    characters: newCounter(),
    keepNotInImport,
    ignoreDups,
  }
}

function newCounter<T>(): ImportResultCounter<T> {
  return {
    import: 0,
    invalid: [],
    new: [],
    update: [],
    unchanged: [],
    upgraded: [],
    remove: [],
    notInImport: 0,
    beforeMerge: 0,
  }
}

export type IGOOD = {
  format: 'GOOD'
  source: string
  version: 1
  characters?: ICharacter[]
  artifacts?: IArtifact[]
  weapons?: IWeapon[]
}

export type IGenshinBuilder = {
  databaseVersion: number
  source: 'Genshin Builder'
  [appKey: string]: unknown
}

export class GenshinBuilderDatabase extends Database {
  artifacts: ArtifactDataManager
  characters: CharacterDataManager
  weapons: WeaponsDataManager

  index: StorageSlot
  version: number

  /**
   *
   */
  constructor(slot: StorageSlot, storage: DatabaseStorage) {
    super(storage)
    // migrate(storage)

    // Transfer non DataManager/DataEntry data from storage
    this.index = slot
    this.version = storage.getVersion()
    this.storage.setVersion(this.version)
    this.storage.setIndex(this.index)
    
    // Handle DataManagers
    // [ ] TODO: instantiate datamangers


    // Invalidate characters when things changes.
  }

  get dataManagers() {
    // IMPORTANT: must respect import order
    return [this.artifacts, this.characters, this.weapons] as const
  }

  get dataEntries() {
    return [] as const
  }

  importGOOD(good: IGOOD, keepNotInImport: boolean, ignoreDups: boolean): ImportResult {
    // [ ] TODO: dopusat' import good
    good = migrateGOOD(good)
    const source = good.source ?? 'Unknown'

    // Some Scanners might carry their own id field, which would conflict with GO dup resolution.
    if (source !== 'Genhin Builder' || source !== 'Genshin Optimizer') {
      good.artifacts?.forEach((x) => delete (x as unknown as { id?: string }).id)
      good.weapons?.forEach((x) => delete (x as unknown as { id?: string }).id)
    }
  }
  exportGOOD() {}

  clear() {
    this.dataManagers.map((dm) => dm.clear())
    // this.teamData = {}
    // this.dataEntries.map((de) => de.clear())
  }

  clearStorage() {}
}
