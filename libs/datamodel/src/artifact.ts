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

  mainStat: IMainStat
  subStats: ISubStat[]

  lock: boolean
  location: LocationCharacterKey | ''
}

export interface IMainStat {
  key: MainStatKey
  value: number
}

export interface ISubStat {
  key: SubStatKey
  value: number
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ICachedMainStat extends IMainStat {}

export interface ICachedSubStat extends ISubStat {
  rolls: number[]
  efficiency: number
  accurateValue: number
}

export interface ICachedArtifact extends IArtifact {
  id: string
  mainStat: ICachedMainStat
  subStats: ICachedSubStat[]
  probability?: number
}
