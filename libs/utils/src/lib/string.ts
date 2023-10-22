/**
 * Pads the given string on the left with the specified padding character to achieve the desired length.
 * Useful for pretty printing timestamps or other strings.
 *
 * @param {string} string - The original string to be padded.
 * @param {string} pad - The padding character or string to use for padding.
 * @param {number} length - The desired length of the resulting padded string.
 * @returns {string} The string padded to the left with the specified padding character.
 */
export function strPadLeft(string: string, pad: string, length: number) {
  return (new Array(length + 1).join(pad) + string).slice(-length);
}

/**
 * **Fuzzy compare strings.** Computes the Hamming distance between two strings, representing the mismatch count.
 * The longer the distance, the higher the mismatch.
 *
 * @param {string} str1 - The first string for comparison.
 * @param {string} str2 - The second string for comparison.
 * @returns {number} The Hamming distance representing the mismatch count.
 */
export function hammingDistance(str1: string, str2: string) {
  // Ensure both strings have the same length by padding the shorter string with spaces
  const maxLength = Math.max(str1.length, str2.length);
  str1 = str1.padEnd(maxLength, ' ');
  str2 = str2.padEnd(maxLength, ' ');
  
  let dist = 0;

  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();
  for (let i = 0, j = Math.max(str1.length, str2.length); i < j; i++) {
    let match = true;
    if (!str1[i] || !str2[i] || str1[i] !== str2[i]) match = false;
    if (str1[i - 1] === str2[i] || str1[i + 1] === str2[i]) match = true;
    if (!match) dist++;
  }
  return dist;
}
