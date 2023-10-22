import {
  ArtifactRarityKey,
  ArtifactSetKey,
  ArtifactSlotKey,
  LocationCharacterKey,
  MainStatKey,
  SubStatKey,
} from '@genshin-builder/consts'

export interface IArtifact {
  setKey: ArtifactSetKey
  slotKey: ArtifactSlotKey
  level: number
  rarity: ArtifactRarityKey

  mainStat: MainStatKey
  subStats: ISubStat[]

  lock: boolean
  location: LocationCharacterKey | ''
}

export interface ISubStat {
  key: SubStatKey | ''
  value: number
}

export interface ICachedSubStat extends ISubStat {
  rolls: number[]
  efficiency: number
  accurateValue: number
}

export interface ICachedArtifact extends IArtifact {
  id: string
  subStats: ICachedSubStat[]
  probability?: number
}
