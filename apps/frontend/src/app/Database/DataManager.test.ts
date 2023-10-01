/* eslint-disable prefer-const */
import { LocalStorage } from "@genshin-builder/database"

import { GenshinBuilderDatabase } from './Database'
import data from "libs/assets/src/artifacts/Adventurer"

const storage = new LocalStorage(localStorage) // localStorage - is default JS Local Storage
const index = 1
let database = new GenshinBuilderDatabase(index, storage)

describe('Database', () => {
  beforeEach(() => {
    database.clear()
    database = new GenshinBuilderDatabase(index, storage)
  })

  test('Datamanager.set', () => {
    const invalid = database.artifacts.set('INVALID', () => ({ level: 0}))
    expect(invalid).toEqual(false)
    expect(database.artifacts.values.length).toEqual(0)

    const id = 'testid'
    database.artifacts.set(id, randomizeArtifact({ level: 0 }))
    expect(database.artifacts.getCacheValue(id)?.level).toEqual(0)

    database.artifacts.set(id, (art) => {
      art.level = art.level + 4
    })
    expect(database.artifacts.getCacheValue(id)?.level).toEqual(4)
  })
})