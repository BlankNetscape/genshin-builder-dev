export const mainStatKeys = [
  'hp',
  'hp_',
  'atk',
  'atk_',
  'def_',
  'eleMas',
  'enerRech_',
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
  'heal_',
] as const

export const substatKeys = [
  'hp',
  'hp_',
  'atk',
  'atk_',
  'def',
  'def_',
  'eleMas',
  'enerRech_',
  'critRate_',
  'critDMG_',
] as const

export type MainStatKey = (typeof mainStatKeys)[number]
export type SubStatKey = (typeof substatKeys)[number]
export type StatKey = MainStatKey | SubStatKey

// TODO: Re check stats
