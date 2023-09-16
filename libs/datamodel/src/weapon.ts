import {
  AscensionKey,
  LocationCharacterKey,
  RefinementKey,
  WeaponKey,
  WeaponRarityKey,
} from '@genshin-builder/consts'

export interface IWeapon {
  key: WeaponKey
  level: number
  rarity: WeaponRarityKey
  ascension: AscensionKey
  refinement: RefinementKey

  lock: boolean
  location: LocationCharacterKey | ''
}

export interface ICachedWeapon extends IWeapon {
  id: string
}
