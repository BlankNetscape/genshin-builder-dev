import { CharacterData } from './CharacterData'
import { WeaponData } from './WeaponData'
import { ArtifactData } from './ArtifactData'

import * as allStats_gen from '../Dump/allStat_gen.json'

export const allStats = allStats_gen as {
  char: CharacterData
  weapon: WeaponData
  art: ArtifactData
}
