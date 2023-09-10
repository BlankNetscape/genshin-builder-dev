export * from './lib/stats'

import { CharacterData } from './CharacterData'
import { WeaponData } from './WeaponData'
import { ArtifactData } from './ArtifactData'

import * as allStat_gen from '../Dump/allStat_gen.json'

export const allStat = allStat_gen as {
  char: CharacterData
  weapon: WeaponData
  art: ArtifactData
}
