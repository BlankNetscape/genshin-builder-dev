import {
  ArtifactSlotKey,
  AscensionKey,
  CharacterKey,
} from '@genshin-builder/consts'

export interface ICharacter {
  key: CharacterKey
  level: number
  constellation: number
  ascension: AscensionKey
  talent: {
    auto: number
    skill: number
    burst: number
  }
}

export interface ICachedCharacter extends ICharacter {
  // NOTE: string -> item id
  equippedArtifacts: StrictDict<ArtifactSlotKey, string>
  equippedWeapon: string
}

// [ ] TODO: Calculatable Character
