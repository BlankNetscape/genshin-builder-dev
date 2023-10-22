/** 
 * "" - number
 * 
 * % - percent
 * 
 * s - time
 */
export type Unit = '' | '%' | 's'

/**
 * Generates a string representation of a numeric value with an optional unit.
 *
 * @param {number} value - The numeric value to convert to a string.
 * @param {string} unit - The unit to append to the value (default: '').
 * @param {number} fixed - The number of decimal places to display (default: -1).
 * @returns {string} The string representation of the value with the specified unit and precision.
 */
export function valueString(
  value: number,
  unit: Unit = '',
  fixed = -1
): string {
  if (!isFinite(value)) {
    if (value > 0) return `\u221E`
    if (value < 0) return `-\u221E`
    return 'NaN'
  }
  if (unit === '%') value *= 100
  if (Number.isInteger(value)) fixed = 0
  else if (fixed === -1) {
    if (unit === '%') fixed = 1
    else
      fixed =
        Math.abs(value) < 10
          ? 3
          : Math.abs(value) < 1000
          ? 2
          : Math.abs(value) < 10000
          ? 1
          : 0
  }
  return `${value.toFixed(fixed)}${unit}`
}

/**
 * Determines the appropriate Unit based on the provided key.
 * 
 * "_" means % - percent.
 *
 * @param {string} key - The key to determine the unit from.
 * @returns {Unit} The corresponding unit based on the key (default: '').
 */
export function unit<Key extends string>(key: Key): Unit {
  if (key.endsWith('_')) return '%'
  return ''
}

/**
 * Converts a numeric value to a percentage based on the provided statKey.
 *
 * @param {number} number - The numeric value to convert to a percentage.
 * @param {string} statKey - The key used to determine whether to convert to a percentage.
 * @returns {number} The converted value (percentage or original value based on the statKey).
 */
export function toPercent(number: number, statKey: string) {
  if (statKey.endsWith('_')) return number * 100
  return number
}