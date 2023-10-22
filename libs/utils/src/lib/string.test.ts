import { hammingDistance } from "./string"

describe('String utils', () => {
  describe('hammingDistance', () => {
    it('should compute the Hamming distance between two strings', () => {
      expect(hammingDistance('karolin', 'kathrin')).toBe(3)
      expect(hammingDistance('1000000', '1000011')).toBe(2)
      expect(hammingDistance('kitten', 'sitting')).toBe(3)
    })

    it('should handle empty strings', () => {
      expect(hammingDistance('', '')).toBe(0)
      expect(hammingDistance('abc', '')).toBe(3)
      expect(hammingDistance('', 'xyz')).toBe(3)
    })

    it('should handle different length strings', () => {
      expect(hammingDistance('abcd', 'ab')).toBe(2)
    })
  
  })
})