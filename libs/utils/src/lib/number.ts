/**
 * Clamps a value within a specified range.
 *
 * @param {number} val - The value to be clamped.
 * @param {number} low - The lower bound of the range.
 * @param {number} high - The upper bound of the range.
 * @returns {number} The clamped value within the specified range.
 */
export const clamp = (val:number, low: number, high: number) => {
  if (val < low) return low
  if (val > high) return high
  return val
}

/** Clamps a value within 0..1 range. */
export const clamp01 = (val: number) => clamp(val, 0, 1)

/** Clamps a value within 0..100 range. */
export const clampPercent = (val: number) => clamp(val, 0, 100)

