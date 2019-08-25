/* eslint-disable import/prefer-default-export */

/**
 * Calculate median from an array of values.
 *
 * Thanks to:
 * https://www.w3resource.com/javascript-exercises/fundamental/javascript-fundamental-exercise-88.php
 *
 * @param {*} arrayOfValues
 */
export function median(arrayOfValues) {
  const mid = Math.floor(arrayOfValues.length / 2);
  const nums = [...arrayOfValues].sort((a, b) => a - b);
  return arrayOfValues.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}
