/**
 * Clamp a number between min and max
 * Ensures ESG scores never exceed valid bounds
 *
 * @param {number} value - input value
 * @param {number} min - minimum allowed (default 0)
 * @param {number} max - maximum allowed (default 100)
 * @returns {number}
 */
const clamp = (value, min = 0, max = 100) => {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return min;
  }

  return Math.max(min, Math.min(max, value));
};

module.exports = clamp;
