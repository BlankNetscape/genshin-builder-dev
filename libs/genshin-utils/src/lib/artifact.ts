import { MainStatKey, RarityKey, SubStatKey, artMaxLevel, artSubStatRollData } from '@genshin-builder/consts'
import { Unit, clampPercent, toPercent, unit } from '@genshin-builder/utils'
import { allStats } from '@genshin-builder/stats'

export function artifactDisplayValue(value: number, unit: Unit): string {
  switch (unit) {
    case '%':
      return (Math.round(value * 10) / 10).toFixed(1)
    default:
      return Math.round(value).toFixed(0)
  }
}

export function getSubStatValuesPercent(
  subStatKey: SubStatKey,
  rarity: RarityKey
) {
  return allStats.art.sub[rarity][subStatKey].map(v => toPercent(v, subStatKey))
}

export function getSubStatRolls(
  subStatKey: SubStatKey,
  subStatValue: number,
  rarity: RarityKey
): number[][] {
  const rollData = getSubStatValuesPercent(subStatKey, rarity)
  const table = allStats.art.subRoll[rarity][subStatKey]
  const lookupValue = artifactDisplayValue(subStatValue, unit(subStatKey))

  return (
    table[lookupValue as unknown as keyof typeof table]?.map((roll) => roll.map(i => rollData[i]))
  ) ?? []
}

export function getSubStatSummedRolls(
  rarity: RarityKey,
  key: SubStatKey
): number[] {
  return Object.keys(allStats.art.subRoll[rarity][key]).map(value => parseFloat(value))
}

export function getSubStatEfficiency(
  subStatKey: SubStatKey | '',
  rolls: number[]
): number {
  const sum = rolls.reduce((a, b) => a + b, 0)
  const max = subStatKey ? getSubStatValue(subStatKey) * rolls.length : 0
  return max ? clampPercent((sum / max) * 100) : 0
}

export function getSubStatValue(
  subStatKey: SubStatKey,
  rarity: RarityKey = 5,
  type: 'max' | 'min' | 'mid' = 'max'
): number {
  const substats = allStats.art.sub[rarity][subStatKey]
  const value =
    type === 'max'
      ? Math.max(...substats)
      : type === 'min'
      ? Math.min(...substats)
      : substats.reduce((a, b) => a + b, 0) / substats.length
  return toPercent(value, subStatKey)
}

/**
 * NOTE: this gives the toPercent value of the main stat
 * @param rarity
 * @param statKey
 * @returns
 */
export function getMainStatDisplayValues(
  rarity: RarityKey,
  statKey: MainStatKey
): number[] {
  return allStats.art.main[rarity][statKey].map((k: number) =>
    toPercent(k, statKey)
  )
}

export function getMainStatDisplayValue(
  key: MainStatKey,
  rarity: RarityKey,
  level: number
): number {
  return getMainStatDisplayValues(rarity, key)[level]
}

export function getMainStatDisplayStr(
  key: MainStatKey,
  rarity: RarityKey,
  level: number,
  showUnit = true
): string {
  return (
    artifactDisplayValue(getMainStatDisplayValue(key, rarity, level), unit(key)) +
    (showUnit ? unit(key) : '')
  )
}

export function getSubStatRange(rarity: RarityKey, key: SubStatKey) {
  const values = Object.keys(allStats.art.subRoll[rarity][key])
  const low = parseFloat(values[0])
  const high = parseFloat(values[values.length - 1])
  return { low, high }
}

export function getRollsRemaining(level: number, rarity: RarityKey) {
  return Math.ceil((artMaxLevel[rarity] - level) / 4)
}

export function getTotalPossibleRolls(rarity: RarityKey) {
  return (
    artSubStatRollData[rarity].high + artSubStatRollData[rarity].numUpgrades
  )
}