/* eslint-disable prefer-const */
import { ICachedCharacter, ICachedWeapon, IWeapon } from '@genshin-builder/datamodel'
import { GenshinBuilderDatabase, IGOOD, ImportResult } from '../Database'
import { CharacterKey, LocationCharacterKey, charKeyToLocationCharKey, locationCharacterKeys, weaponKeys, weaponMaxLevel } from '@genshin-builder/consts'
import { allStat } from '@genshin-builder/stats'
import { DataManager } from './GenshinBuilderDataManager'
import { defaultInitialWeapon } from '../../Util/WeaponUtil'
import { initCharacter } from '../../Util/CharacterUtil'
import { validateLevelAsc } from '../../Util/LevelUtils'

export class WeaponsDataManager extends DataManager<string, 'weapons', ICachedWeapon, IWeapon, GenshinBuilderDatabase> {
  constructor(database: GenshinBuilderDatabase) {
    super(database, 'weapons')
    for (const key of this.database.storage.keys) {
      if (key.startsWith('weapon_') && !this.set(key, {})) {
        this.database.storage.remove(key)
      }
    }
  }

  ensureEquipments() {
    const weaponIds = new Set(this.keys)
    const newWeapons: IWeapon[] = []

    for (const charKey of this.database.characters.keys) {
      const newWeapon = this.ensureEquipment(charKey, weaponIds)
      if (newWeapon) newWeapons.push(newWeapon)
    }
    return newWeapons
  }

  ensureEquipment(charKey: CharacterKey, weaponIds: Set<string> = new Set(this.keys)) {
    const char = this.database.characters.get(charKey)
    if (char?.equippedWeapon) return undefined
    const locKey = charKeyToLocationCharKey(charKey)
    const weapon = defaultInitialWeapon(allStat.char.data[locKey].weaponType)
    const weaponId = this.generateKey(weaponIds)
    weaponIds.add(weaponId)
    this.set(weaponId, { ...weapon, location: locKey })
    return weapon
  }

  new(value: IWeapon): string {
    const id = this.generateKey()
    this.set(id, value)
    return id
  }

  findDups(
    weapon: IWeapon,
    idList = this.keys
  ): { duplicated: ICachedWeapon[]; upgraded: ICachedWeapon[] } {
    const { key, level, ascension, refinement } = weapon

    const weapons = idList
      .map((id) => this.getCacheValue(id))
      .filter((a) => a) as ICachedWeapon[]
    const candidates = weapons.filter(
      (candidate) =>
        key === candidate.key &&
        level >= candidate.level &&
        ascension >= candidate.ascension &&
        refinement >= candidate.refinement
    )

    // Strictly upgraded weapons
    const upgraded = candidates
      .filter(
        (candidate) =>
          level > candidate.level ||
          ascension > candidate.ascension ||
          refinement > candidate.refinement
      )
      .sort((candidates) => (candidates.location === weapon.location ? -1 : 1))
    // Strictly duplicated weapons
    const duplicated = candidates
      .filter(
        (candidate) =>
          level === candidate.level &&
          ascension === candidate.ascension &&
          refinement === candidate.refinement
      )
      .sort((candidates) => (candidates.location === weapon.location ? -1 : 1))
    return { duplicated, upgraded }
  }

  override validate(obj: unknown): IWeapon | undefined {
    if (typeof obj !== 'object') return undefined
    const { key, level: rawLevel, ascension: rawAscension } = obj as IWeapon
    let { refinement, location, lock } = obj as IWeapon

    if (!weaponKeys.includes(key)) return undefined
    const { rarity, weaponType } = allStat.weapon.data[key]
    if (rawLevel > weaponMaxLevel[rarity]) return undefined
    const { level, ascension } = validateLevelAsc(rawLevel, rawAscension)
    if (typeof refinement !== 'number' || refinement < 1 || refinement > 5) refinement = 1
    if (location && !locationCharacterKeys.includes(location)) location = ''
    if (location && allStat.char.data[location as LocationCharacterKey].weaponType !== weaponType) return undefined
    lock = !!lock
    return { key, level, rarity, ascension, refinement, location, lock }
  }

  override toCache(storageObj: IWeapon, id: string): ICachedWeapon | undefined {
    const newWeapon = { ...storageObj, id }
    const oldWeapon = super.getCacheValue(id)
    // Disallow unequipping of weapons
    if (!newWeapon.location && oldWeapon?.location) return undefined

    // During initialization of the database, if you import weapons with location without a corresponding character, the char will be generated here.
    const getWithInit = (lk: LocationCharacterKey): ICachedCharacter => {
      const cKey = this.database.characters.LocationToCharacterKey(lk)
      if (!this.database.characters.keys.includes(cKey)) this.database.characters.set(cKey, initCharacter(cKey))
      return this.database.characters.get(cKey) as ICachedCharacter
    }
    if (newWeapon.location !== oldWeapon?.location) {
      const prevChar = oldWeapon?.location ? getWithInit(oldWeapon.location) : undefined
      const newChar = newWeapon.location ? getWithInit(newWeapon.location) : undefined

      // previously equipped art at new location
      const prevWeapon = super.getCacheValue(newChar?.equippedWeapon)

      //current prevWeapon <-> newChar  && newWeapon <-> prevChar
      //swap to prevWeapon <-> prevChar && newWeapon <-> newChar(outside of this if)

      if (prevWeapon)
        super.setCachedEntry(prevWeapon.id, {
          ...prevWeapon,
          location: prevChar?.key ? charKeyToLocationCharKey(prevChar.key) : '',
        })
      if (newChar) this.database.characters.setEquippedWeapon(charKeyToLocationCharKey(newChar.key), newWeapon.id)
      if (prevChar) this.database.characters.setEquippedWeapon(charKeyToLocationCharKey(prevChar.key), prevWeapon?.id ?? '')
    } else newWeapon.location && this.database.characters.triggerCharacter(newWeapon.location, 'update')
    return newWeapon
  }

  override deCache(cacheObj: ICachedWeapon): IWeapon {
    const { key, level, rarity, ascension, refinement, location, lock } = cacheObj
    return { key, level, rarity, ascension, refinement, location, lock }
  }

  override remove(key: string, notify = true) {
    const weapon = this.getCacheValue(key)
    if (!weapon || weapon.location) return // Can't delete equipped weapon here
    super.remove(key, notify)
  }

  override importGOOD(good: IGOOD, resultContainer: ImportResult): void {
    resultContainer.weapons.beforeMerge = this.values.length

    const weapons = good.weapons

    if(!Array.isArray(weapons) || !weapons.length) {
      resultContainer.weapons.notInImport = this.values.length
      return
    }

    const takenIDs = new Set(this.keys)
    weapons.forEach((x) => {
      const id = (x as ICachedWeapon).id
      if(!id) return
      takenIDs.add(id)
    })

    resultContainer.weapons.import = weapons.length
    const IDsToRemove = new Set(this.values.map(value => (value as ICachedWeapon).id))
    const hasEquipment = weapons.some(weapon => weapon.location)
    weapons.forEach((w): void => {
      const weapon = this.validate(w)
      if (!weapon) {
        resultContainer.weapons.invalid.push(w)
        return
      }

      let importWeapon = weapon
      let importId: string | undefined = (w as ICachedWeapon).id
      let foundDupOrUpgrade = false
      if (!resultContainer.ignoreDups) {
        const { duplicated, upgraded } = this.findDups(
          weapon,
          Array.from(IDsToRemove)
        )
        if (duplicated[0] || upgraded[0]) {
          foundDupOrUpgrade = true
          // Favor upgrades with the same location, else use 1st dupe
          let [match, isUpgrade] =
            hasEquipment &&
            weapon.location &&
            upgraded[0]?.location === weapon.location
              ? [upgraded[0], true]
              : duplicated[0]
              ? [duplicated[0], false]
              : [upgraded[0], true]
          if (importId) {
            // favor exact id matches
            const up = upgraded.find((w) => w.id === importId)
            if (up) [match, isUpgrade] = [up, true]
            const dup = duplicated.find((w) => w.id === importId)
            if (dup) [match, isUpgrade] = [dup, false]
          }
          isUpgrade
            ? resultContainer.weapons.upgraded.push(weapon)
            : resultContainer.weapons.unchanged.push(weapon)
          IDsToRemove.delete(match.id)

          //Imported weapon will be set to `importId` later, so remove the dup/upgrade now to avoid a duplicate
          super.remove(match.id, false) // Do not notify, since this is a "replacement". Also use super to bypass the equipment check
          if (!importId) importId = match.id // always resolve some id
          importWeapon = {
            ...weapon,
            location: hasEquipment ? weapon.location : match.location,
          }
        }
      }
      if (importId) {
        if (this.getCacheValue(importId)) {
          // `importid` already in use, get a new id
          const newId = this.generateKey(takenIDs)
          takenIDs.add(newId)
          if (this.changeId(importId, newId)) {
            // Sync the id in `idsToRemove` due to the `changeId`
            if (IDsToRemove.has(importId)) {
              IDsToRemove.delete(importId)
              IDsToRemove.add(newId)
            }
          }
        }
        this.set(importId, importWeapon, !foundDupOrUpgrade)
      } else {
        importId = this.generateKey(takenIDs)
        takenIDs.add(importId)
      }
      this.set(importId, importWeapon, !foundDupOrUpgrade)
    })

    // Shouldn't remove Somnia's signature
    const idtoRemoveArr = Array.from(IDsToRemove).filter(
      (id) => this.getCacheValue(id)?.key !== 'QuantumCatalyst'
    )
    if (resultContainer.keepNotInImport || resultContainer.ignoreDups)
    resultContainer.weapons.notInImport = idtoRemoveArr.length
    else idtoRemoveArr.forEach((k) => this.remove(k))

    this.database.weapons.ensureEquipments()
  }
}

// [ ] TODO: export somewhere
