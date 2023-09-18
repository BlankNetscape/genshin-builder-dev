import { MainStatKey } from './stats'

// Non Traveler Character Keys
export const ntCharacterKeys = [
  'Albedo',
  'Alhaitham',
  'Aloy',
  'Amber',
  'AratakiItto',
  'Baizhu',
  'Barbara',
  'Beidou',
  'Bennett',
  'Candace',
  'Chongyun',
  'Collei',
  'Cyno',
  'Dehya',
  'Diluc',
  'Diona',
  'Dori',
  'Eula',
  'Faruzan',
  'Fischl',
  'Ganyu',
  'Gorou',
  'HuTao',
  'Jean',
  'KaedeharaKazuha',
  'Kaeya',
  'KamisatoAyaka',
  'KamisatoAyato',
  'Kaveh',
  'Keqing',
  'Kirara',
  'Klee',
  'KujouSara',
  'KukiShinobu',
  'Layla',
  'Lisa',
  'Lynette',
  'Lyney',
  'Mika',
  'Mona',
  'Nahida',
  'Nilou',
  'Ningguang',
  'Noelle',
  'Qiqi',
  'RaidenShogun',
  'Razor',
  'Rosaria',
  'SangonomiyaKokomi',
  'Sayu',
  'Shenhe',
  'ShikanoinHeizou',
  'Somnia',
  'Sucrose',
  'Tartaglia',
  'Thoma',
  'Tighnari',
  'Venti',
  'Wanderer',
  'Xiangling',
  'Xiao',
  'Xingqiu',
  'Xinyan',
  'YaeMiko',
  'Yanfei',
  'Yaoyao',
  'Yelan',
  'Yoimiya',
  'YunJin',
  'Zhongli',
] as const
export type NTCharacterKey = (typeof ntCharacterKeys)[number]

export const travelerKeys = [
  'TravelerAnemo',
  'TravelerGeo',
  'TravelerElectro',
  'TravelerHydro',
  'TravelerDendro',
] as const
export type TravelerKey = (typeof travelerKeys)[number]

export type CharacterKey = NTCharacterKey | TravelerKey
export type GenderedCharacterKey = NTCharacterKey | 'TravelerM' | 'travelerF'
export type LocationCharacterKey = NTCharacterKey | 'Traveler'
export const locationCharacterKeys = [...ntCharacterKeys, 'Traveler']

export type GenderKey = 'F' | 'M'

export type ElementKey =
  | 'anemo'
  | 'geo'
  | 'electro'
  | 'hydro'
  | 'pyro'
  | 'cryo'
  | 'dendro'

export type ElementWithPhyKey = ElementKey | 'physical'

export type TravelerElementKey =
  | 'anemo'
  | 'geo'
  | 'electro'
  | 'hydro'
  | 'dendro'

export type RegionKey =
  | 'mondstadt'
  | 'liyue'
  | 'inazuma'
  | 'sumeru'
  | 'fontaine'
  | 'natlan'
  | 'snezhnaya'
  | 'khaenriah'

export const travelerElementMap: Partial<Record<ElementKey, TravelerKey>> = {
  anemo: 'TravelerAnemo',
  geo: 'TravelerGeo',
  electro: 'TravelerElectro',
  dendro: 'TravelerDendro',
  hydro: 'TravelerHydro',
} as const

export const ascensionKeys = [0, 1, 2, 3, 4, 5, 6] as const
export type AscensionKey = (typeof ascensionKeys)[number]

export type MoveKey =
  | 'normal'
  | 'charged'
  | 'plunging'
  | 'skill'
  | 'burst'
  | 'elemental'

export const characterStatKeys: readonly MainStatKey[] = [
  'hp_',
  'atk_',
  'def_',
  'eleMas',
  'enerRech_',
  'heal_',
  'critRate_',
  'critDMG_',
  'physical_dmg_',
  'anemo_dmg_',
  'geo_dmg_',
  'electro_dmg_',
  'hydro_dmg_',
  'pyro_dmg_',
  'cryo_dmg_',
  'dendro_dmg_',
] as const
export type CharacterSpecializedStatKey = (typeof characterStatKeys)[number]

export function charKeyToGenderedCharKey(key: CharacterKey, gender: GenderKey) {
  return travelerKeys.includes(key as TravelerKey)
    ? (`Traveler${gender}` as GenderedCharacterKey)
    : (key as GenderedCharacterKey)
}

export function charKeyToLocationCharKey(key: CharacterKey) {
  return travelerKeys.includes(key as TravelerKey)
    ? ('Traveler' as LocationCharacterKey)
    : (key as LocationCharacterKey)
}

export function locationCharKeyToCharKey(
  key: LocationCharacterKey,
  element: TravelerElementKey = 'anemo'
) {
  return key === 'Traveler'
    ? (travelerElementMap[element] as CharacterKey)
    : (key as CharacterKey)
}

export function getTavelerFromElement(
  element: TravelerElementKey
): TravelerKey {
  return ('Traveler' +
    element.toUpperCase().slice(0, 1) +
    element.slice(1)) as TravelerKey
}

export function getTravelerElement(key: TravelerKey) {
  switch (key) {
    case 'TravelerAnemo':
      return 'anemo' as ElementKey
    case 'TravelerGeo':
      return 'geo' as ElementKey
    case 'TravelerElectro':
      return 'electro' as ElementKey
    case 'TravelerHydro':
      return 'hydro' as ElementKey
    case 'TravelerDendro':
      return 'dendro' as ElementKey
  }
}
