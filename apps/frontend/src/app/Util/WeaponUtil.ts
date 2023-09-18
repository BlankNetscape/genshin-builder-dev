import { WeaponKey, WeaponTypeKey } from '@genshin-builder/consts'
import { ICachedWeapon } from '@genshin-builder/datamodel'

export function getDefaultInitialWeaponKey(type: WeaponTypeKey): WeaponKey {
  switch (type) {
    case 'sword':
      return 'DullBlade'
    case 'bow':
      return 'HuntersBow'
    case 'claymore':
      return 'WasterGreatsword'
    case 'polearm':
      return 'BeginnersProtector'
    case 'catalyst':
      return 'ApprenticesNotes'
    default:
      return 'DullBlade'
  }
}

export const defaultInitialWeapon = (type: WeaponTypeKey = 'sword'): ICachedWeapon => initWeapon(getDefaultInitialWeaponKey(type))

export const initWeapon = (key: WeaponKey): ICachedWeapon => ({
  id: '',
  key,
  rarity: 1,
  level: 1,
  ascension: 0,
  refinement: 1,
  location: '',
  lock: false,
})
