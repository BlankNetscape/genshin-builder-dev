import { RarityKey } from './common'
import { MainStatKey } from './stats'

export const artifactSetKeys = [
  'Adventurer',
  'ArchaicPetra',
  'Berserker',
  'BlizzardStrayer',
  'BloodstainedChivalry',
  'BraveHeart',
  'CrimsonWitchOfFlames',
  'DeepwoodMemories',
  'DefendersWill',
  'DesertPavilionChronicle',
  'EchoesOfAnOffering',
  'EmblemOfSeveredFate',
  'FlowerOfParadiseLost',
  'Gambler',
  'GildedDreams',
  'GladiatorsFinale',
  'GoldenTroupe',
  'HeartOfDepth',
  'HuskOfOpulentDreams',
  'Instructor',
  'Lavawalker',
  'LuckyDog',
  'MaidenBeloved',
  'MarechausseeHunter',
  'MartialArtist',
  'NoblesseOblige',
  'NymphsDream',
  'OceanHuedClam',
  'PaleFlame',
  'PrayersForDestiny',
  'PrayersForIllumination',
  'PrayersForWisdom',
  'PrayersToSpringtime',
  'ResolutionOfSojourner',
  'RetracingBolide',
  'Scholar',
  'ShimenawasReminiscence',
  'TenacityOfTheMillelith',
  'TheExile',
  'ThunderingFury',
  'Thundersoother',
  'TinyMiracle',
  'TravelingDoctor',
  'VermillionHereafter',
  'ViridescentVenerer',
  'VourukashasGlow',
  'WanderersTroupe',
] as const
export type ArtifactSetKey = (typeof artifactSetKeys)[number]

export const artifactSlotKeys = [
  'flower',
  'plume',
  'sands',
  'goblet',
  'circlet',
] as const
export type ArtifactSlotKey = (typeof artifactSlotKeys)[number]

export type ArtifactRarityKey = 1 | 2 | 3 | 4 | 5

export const artMaxLevel: Record<RarityKey, number> = {
  1: 4,
  2: 4,
  3: 12,
  4: 16,
  5: 20,
} as const

export const artSubStatRollData: Record<
  RarityKey,
  { low: number; high: number; numUpgrades: number }
> = {
  1: { low: 0, high: 0, numUpgrades: 1 },
  2: { low: 0, high: 1, numUpgrades: 2 },
  3: { low: 1, high: 2, numUpgrades: 3 },
  4: { low: 2, high: 3, numUpgrades: 4 },
  5: { low: 3, high: 4, numUpgrades: 5 },
} as const

export const artifactSandsStatKeys: readonly MainStatKey[] = [
  'hp_',
  'def_',
  'atk_',
  'eleMas',
  'enerRech_',
] as const
export type ArtifactSandsStatKey = (typeof artifactSandsStatKeys)[number]

export const artifactGobletStatKeys: readonly MainStatKey[] = [
  'hp_',
  'def_',
  'atk_',
  'eleMas',
  'physical_dmg_',
  'anemo_dmg_',
  'geo_dmg_',
  'electro_dmg_',
  'hydro_dmg_',
  'pyro_dmg_',
  'cryo_dmg_',
  'dendro_dmg_',
] as const
export type ArtifactGobletStatKey = (typeof artifactGobletStatKeys)[number]

export const artifactCircletStatKeys: readonly MainStatKey[] = [
  'hp_',
  'def_',
  'atk_',
  'eleMas',
  'critRate_',
  'critDMG_',
  'heal_',
] as const
export type ArtifactCircletStatKey = (typeof artifactCircletStatKeys)[number]

export const artifactPlumeKeys: readonly MainStatKey[] = ['atk']
export type ArtifactPlumeKey = (typeof artifactPlumeKeys)[number]

export const artifactFlowerKeys: readonly MainStatKey[] = ['hp']
export type ArtifactFlowerKey = (typeof artifactFlowerKeys)[number]

export const artSlotsData = {
  flower: { name: 'Flower of Life', stats: artifactFlowerKeys },
  plume: { name: 'Plume of Death', stats: artifactPlumeKeys },
  sands: { name: 'Sands of Eon', stats: artifactSandsStatKeys },
  goblet: { name: 'Goblet of Eonothem', stats: artifactGobletStatKeys },
  circlet: { name: 'Circlet of Logos', stats: artifactCircletStatKeys },
} as const

// GO currently only support 3-5 star artifacts
// export const goArtifactRarityKeys = [5, 4, 3] as const
// export type ArtifactRarity = (typeof goArtifactRarityKeys)[number]

export const rollColorKeys = [
  'roll1',
  'roll2',
  'roll3',
  'roll4',
  'roll5',
  'roll6',
] as const

export type RollColorKey = (typeof rollColorKeys)[number]