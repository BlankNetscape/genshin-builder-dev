import {
  MainStatKey,
  RarityKey,
  WeaponKey,
  WeaponTypeKey,
} from '@genshin-builder/consts'

export type WeaponData = {
  expCurve: Record<string, number[]>
  data: Record<WeaponKey, Data>
}

type Data = {
  weaponType: WeaponTypeKey
  rarity: RarityKey
  mainStat: MainStat
  lvlCurves: LvlCurves[]
  refinementBonus: Record<string, number[]>
  ascensionBonus: Record<string, number[]>
}

type MainStat = {
  type: MainStatKey
  base: number
  curve: string // GROW_CURVE_ATTACK_101
}

type LvlCurves = {
  key: MainStatKey
  base: number
  curve: string
}
