/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ElementKey,
  LocationCharacterKey,
  RarityKey,
  RegionKey,
  WeaponTypeKey,
} from '@genshin-builder/consts'

export type CharacterData = {
  expCurve: CharExpCurve
  skillParam: Record<string, SkillParameter>
  data: Record<string, Data>
}

type CharExpCurve = {
  GROW_CURVE_HP_S4: number[]
  GROW_CURVE_ATTACK_S4: number[]
  GROW_CURVE_HP_S5: number[]
  GROW_CURVE_ATTACK_S5: number[]
}
type SkillParameter = {
  auto: any[]
  skill: any[]
  burst: any[]
  sprint?: any[]
  passive1: any[]
  passive2?: any[]
  passive3?: any[]
  constellation1: any[]
  constellation2: any[]
  constellation3: any[]
  constellation4: any[]
  constellation5: any[]
  constellation6: any[]
}
type LvlCurve = {
  key: string
  base: number
  curve: string
}
type Data = {
  key: LocationCharacterKey
  ele?: ElementKey
  region?: RegionKey
  weaponType: WeaponTypeKey
  birthday: { month?: number; day?: number }
  rarity: RarityKey
  lvlCurves: LvlCurve[]
  ascensionBonus: {
    hp?: number[]
    hp_?: number[]
    atk?: number[]
    atk_?: number[]
    def?: number[]
    def_?: number[]
    eleMas?: number[]
    enerRech_?: number[]
    critRate_?: number[]
    critDMG_?: number[]
    physical_dmg_?: number[]
    anemo_dmg_?: number[]
    geo_dmg_?: number[]
    electro_dmg_?: number[]
    hydro_dmg_?: number[]
    pyro_dmg_?: number[]
    cryo_dmg_?: number[]
    dendro_dmg_?: number[]
    heal_?: number[]
    shield_?: number[]
    stamina?: number[]
    incHeal_?: number[]
    cdRed_?: number[]
  }
}
