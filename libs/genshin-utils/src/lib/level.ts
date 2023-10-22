import { AscensionKey } from '@genshin-builder/consts'

type Levels = {
  lowLevels: Record<number, number>
  maxLevels: Record<number, number>
}

export const levels: Levels = {
  lowLevels: {
    0: 1,
    1: 20,
    2: 40,
    3: 50,
    4: 60,
    5: 70,
    6: 80,
  },
  maxLevels: {
    0: 20,
    1: 40,
    2: 50,
    3: 60,
    4: 70,
    5: 80,
    6: 90,
  },
}

export const getLevelString = (level: number, ascension: AscensionKey): string => `${level}/${levels.maxLevels[ascension]}`

/**
 * Validates and adjusts the provided level and ascension based on specified constraints.
 *
 * @param {number} level - The level of the character or item.
 * @param {AscensionKey} ascension - The ascension key associated with the level.
 * @returns {{ level: number, ascension: AscensionKey }} The validated and adjusted level and ascension.
 */
export function validateLevelAsc(
  level: number,
  ascension: AscensionKey
): { level: number, ascension: AscensionKey } {
  if (typeof level !== 'number' || level < 1 || level > levels.maxLevels[6]) level = 1
  if (typeof ascension !== 'number' || ascension < 0 || ascension > 6) ascension = 0

  if (level > levels.maxLevels[ascension] || level < (levels.lowLevels[ascension])) {
    const asc = Object.entries(levels.maxLevels).find(kv => level <= kv[1])?.[0]
    // if(asc) ascension = parseInt(asc) as AscensionKey
    // else ascension = 0 

    ascension = asc ? parseInt(asc) as AscensionKey : 0
  }

  return { level, ascension }
}