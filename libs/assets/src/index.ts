import {
  ArtifactSetKey,
  ArtifactSlotKey,
  WeaponKey,
} from '@genshin-builder/consts'
import artifacts from './artifacts'
import chars from './characters'
import weapons from './weapons'

export * from './genreal'
export * from './svg-icons'

export const combinedAssets = {
  artifacts,
  chars,
  weapons,
} as const

export function artifactAsset(
  ak: ArtifactSetKey,
  slotKey: ArtifactSlotKey
): string {
  if (
    ak === 'PrayersForDestiny' ||
    ak === 'PrayersForIllumination' ||
    ak === 'PrayersForWisdom' ||
    ak === 'PrayersToSpringtime'
  )
    return artifacts[ak].circlet
  else return artifacts[ak][slotKey] ?? ''
}

export function weaponAsset(wk: WeaponKey, empowered = true) {
  return (
    weapons[wk][empowered ? 'awakenIcon' : 'icon'] ?? weapons[wk]['icon'] ?? ''
  )
}
