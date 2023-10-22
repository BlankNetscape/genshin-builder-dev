import { CharacterKey, artifactSlotKeys } from '@genshin-builder/consts'
import { ICachedCharacter } from '@genshin-builder/datamodel'
import { objKeyMap } from '@genshin-builder/utils'

export function initialCharacter(key: CharacterKey): ICachedCharacter {
  // TODO 'team' should be implemented to initialCharacter
  return {
    key,
    level: 1,
    constellation: 0,
    ascension: 0,
    talent: {
      auto: 1,
      skill: 1,
      burst: 1,
    },
    equippedArtifacts: objKeyMap(artifactSlotKeys, () => ''),
    equippedWeapon: '',
    // TODO: initial infusionAura
    infusionAura: 'anemo'
  }
}
