/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ArtifactSetKey,
  ArtifactSlotKey,
  RarityKey,
} from '@genshin-builder/consts'

export type ArtifactData = {
  data: Record<ArtifactSetKey, Data>
  subRoll: Record<string, Record<string, Record<string, any[]>>>
  subRollCorrection: Record<string, Record<string, Record<string, string>>>
  main: Record<string, Record<string, number[]>>
  sub: Record<string, Record<string, number[]>>
}

type Data = {
  setNum: number[]
  rarities: RarityKey[]
  slots: ArtifactSlotKey[]
}
