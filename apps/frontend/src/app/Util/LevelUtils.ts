import { AscensionKey } from "@genshin-builder/consts";

export function validateLevelAsc(level: number, ascension: AscensionKey): { level: number; ascension: AscensionKey } {
  const ascensionMaxLevelLow = [20, 40, 50, 60, 70] as const
  const maxLevel = 90
  const maxLevelLow = 70
  const ascensionMaxLevel = [...ascensionMaxLevelLow, 80, 90] as const

  if (typeof level !== 'number' || level < 1 || level > 90) level = 1
  if (typeof ascension !== 'number' || ascension < 0 || ascension > 6) ascension = 0

  if (level > ascensionMaxLevel[ascension] || level < (ascensionMaxLevel[ascension - 1] ?? 0)) ascension = ascensionMaxLevel.findIndex((maxLvl) => level <= maxLvl) as AscensionKey
  return { level, ascension }
}
