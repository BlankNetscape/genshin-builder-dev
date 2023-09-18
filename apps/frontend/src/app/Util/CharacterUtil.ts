import { CharacterKey, artifactSlotKeys } from "@genshin-builder/consts";
import { ICachedCharacter } from "@genshin-builder/datamodel";
import { objKeyMap } from "./Utils";

export function initCharacter(key: CharacterKey): ICachedCharacter {
  return {
    key,
    level: 1,
    constellation: 0,
    ascension: 0,
    talent: {
      auto: 0,
      skill: 0,
      burst: 0
    },
    equippedArtifacts: objKeyMap(artifactSlotKeys, () => ''),
    equippedWeapon: ''
  }
}