import { AscensionKey } from '@genshin-builder/consts'
import { validateLevelAsc } from './level'

describe('Genshin utils tests', () => {
  describe('validateLevelAsc', () => {
    it('should validate valid level and ascension', () => {
      const validInput = validateLevelAsc(35, 1)

      expect(validInput).toEqual({ level: 35, ascension: 1 })
    })

    it('should validate greater level and ascension', () => {
      const invalidInput = validateLevelAsc(75, 0)

      expect(invalidInput).toEqual({ level: 75, ascension: 5 })
    })

    it('should validate lower level and ascension', () => {
      const invalidInput = validateLevelAsc(5, 4)

      expect(invalidInput).toEqual({ level: 5, ascension: 0 })
    })

    it('should validate zero/negative level', () => {
      const negaqtiveInput = validateLevelAsc(-999, 6)
      const zeroInput = validateLevelAsc(0, 6)

      expect(negaqtiveInput).toEqual({ level: 1, ascension: 0 })
      expect(zeroInput).toEqual({ level: 1, ascension: 0 })
    })
  })
})
