import { clamp, clamp01 } from "./number"

describe('Number utils', () => {

  describe('clamp', () => {
    it('should clamp a value within the specified range', () => {
      expect(clamp(5, 1, 10)).toBe(5)   // Value within range, should return the same value
      expect(clamp(0, 1, 10)).toBe(1)   // Value below range, should clamp to the lower bound
      expect(clamp(15, 1, 10)).toBe(10) // Value above range, should clamp to the upper bound
    })

    it('should handle the lower bound edge case', () => {
      expect(clamp(1, 1, 10)).toBe(1)   // Value equal to the lower bound, should remain the same
    })

    it('should handle the upper bound edge case', () => {
      expect(clamp(10, 1, 10)).toBe(10) // Value equal to the upper bound, should remain the same
    })

    it('should handle negative values', () => {
      expect(clamp(-5, -10, -1)).toBe(-5)   // Negative value within the negative range
      expect(clamp(-15, -10, -1)).toBe(-10) // Negative value below the negative range
      expect(clamp(-1, -10, -1)).toBe(-1)   // Negative value equal to the negative upper bound
    })

    it('should handle null and undefined', () => {
      // [ ] Clamp should handle null and undefined
      // expect(clamp(null, 1, 10)).toBe(undefined)      // null should be treated as a value below the range
      // expect(clamp(undefined, 1, 10)).toBe(undefined) // undefined should be treated as a value below the range
    })
  })

  describe('clamp01', () => {
    it('should clamp a value within the 0..1 range', () => {
      expect(clamp01(0.5)).toBe(0.5) // Value within the 0..1 range, should return the same value
      expect(clamp01(-1)).toBe(0) // Value below the 0..1 range, should clamp to 0
      expect(clamp01(2)).toBe(1) // Value above the 0..1 range, should clamp to 1
    })

    it('should handle the lower bound edge case', () => {
      expect(clamp01(0)).toBe(0) // Value equal to the lower bound, should remain the same
    })

    it('should handle the upper bound edge case', () => {
      expect(clamp01(1)).toBe(1) // Value equal to the upper bound, should remain the same
    })

    it('should handle negative values', () => {
      expect(clamp01(-0.5)).toBe(0) // Negative value, should clamp to 0
      expect(clamp01(-1)).toBe(0) // Negative value, should clamp to 0
    })

    it('should handle values greater than 1', () => {
      expect(clamp01(1.5)).toBe(1) // Value greater than 1, should clamp to 1
      expect(clamp01(10)).toBe(1) // Value greater than 1, should clamp to 1
    })

    it('should handle null and undefined', () => {
      // expect(clamp01(null)).toBe(undefined) // null should be treated as a value below the range
      // expect(clamp01(undefined)).toBe(undefined) // undefined should be treated as a value below the range
    })
  })
})