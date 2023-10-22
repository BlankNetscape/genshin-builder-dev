import {
  ArtifactSetKey,
  ArtifactSlotKey,
  RarityKey,
  RollColorKey,
  SubStatKey,
  artMaxLevel,
  artSlotsData,
  artSubStatRollData,
  artifactSetKeys,
  artifactSlotKeys,
  rarityKeys,
  subStatKeys,
} from '@genshin-builder/consts'
import { getRandomElementFromArray, getRandomIntInclusive, objKeyMap } from '@genshin-builder/utils'
import { getRollsRemaining, getSubStatValue } from './lib/artifact'
import { IArtifact, ICachedArtifact, IMainStat, ISubStat } from '@genshin-builder/datamodel'
import { allStats } from '@genshin-builder/stats'

const maxStar: RarityKey = 5

export function randomizeArtifact(base: Partial<IArtifact> = {}): IArtifact {
  // TODO: !!! do not randomize Prayers since they don't have all slots
  const setKey = base.setKey ?? getRandomElementFromArray(artifactSetKeys)
  const data = allStats.art.data[setKey]

  // TODO: ??? random rarities check
  const rarity: RarityKey = (base.rarity ?? getRandomElementFromArray(data.rarities))
  const slot: ArtifactSlotKey = base.slotKey ?? getRandomElementFromArray(artifactSlotKeys)
  const mainStat: IMainStat = {key: base.mainStat?.key ?? getRandomElementFromArray(artSlotsData[slot].stats), value: 999}
  const level = base.level ?? getRandomIntInclusive(0, artMaxLevel[rarity as RarityKey])
  const subStats: ISubStat[] = [0, 1, 2, 3].map(() => ({ key: '', value: 0 }))
  const { low, high } = artSubStatRollData[rarity]

  // TODO: Other stuff (in Random Artifact)
  return {
    setKey,
    rarity,
    slotKey: slot,
    mainStat,
    level,
    subStats,
    location: base.location ?? '',
    lock: false,
  }
}


export default class Artifact {
  constructor() {
    if (this instanceof Artifact)
      throw Error('A static class cannot be instantiated.')
  }

  static getArtifactEfficiency(
    artifact: ICachedArtifact,
    filter: Set<SubStatKey>
  ): { currentEfficiency: number; maxEfficiency: number } {
    const { subStats, rarity, level } = artifact
    // Relative to max star, so comparison between different * makes sense.
    const currentEfficiency = subStats
      .filter(({ key }) => key && filter.has(key))
      .reduce((sum, { efficiency }) => sum + (efficiency ?? 0), 0)

    const rollsRemaining = getRollsRemaining(level, rarity)
    const emptySlotCount = subStats.filter((s) => !s.key).length
    const matchedSlotCount = subStats.filter(
      (s) => s.key && filter.has(s.key)
    ).length
    const unusedFilterCount =
      filter.size -
      matchedSlotCount -
      (filter.has(artifact.mainStat.key as any) ? 1 : 0)

    let maxEfficiency
    if (emptySlotCount && unusedFilterCount)
      maxEfficiency =
        currentEfficiency +
        Artifact.maxSubstatRollEfficiency[rarity] * rollsRemaining
    // Rolls into good empty slot
    else if (matchedSlotCount)
      maxEfficiency =
        currentEfficiency +
        Artifact.maxSubstatRollEfficiency[rarity] *
          (rollsRemaining - emptySlotCount)
    // Rolls into existing matched slot
    else maxEfficiency = currentEfficiency // No possible roll

    return { currentEfficiency, maxEfficiency }
  }

  //start with {slotKey:art} end with {setKey:[slotKey]}
  static setToSlots = (
    artifacts: Dict<ArtifactSlotKey, ICachedArtifact>
  ): Dict<ArtifactSetKey, ArtifactSlotKey[]> => {
    const setToSlots: Dict<ArtifactSetKey, ArtifactSlotKey[]> = {}
    Object.entries(artifacts).forEach(([key, art]) => {
      if (!art) return
      if (setToSlots[art.setKey]) setToSlots[art.setKey]!.push(key)
      else setToSlots[art.setKey] = [key]
    })
    return setToSlots
  }

  static levelVariant = (level: number) =>
    ('roll' + (Math.floor(Math.max(level, 0) / 4) + 1)) as RollColorKey

  // Utils
  static maxSubstatRollEfficiency = objKeyMap(
    rarityKeys,
    (rarity) =>
      100 *
      Math.max(
        ...subStatKeys.map(
          (substat) =>
            getSubStatValue(substat, rarity) / getSubStatValue(substat, maxStar)
        )
      )
  )
}
