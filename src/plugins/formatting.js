/* eslint-disable import/prefer-default-export */

/**
 *
 * @param {Number} value Число к которому прикреплятся склоненная фраза
 * @param {Array} wordVariants Массив склонений типа ['минута', 'минут', 'минуты']
 * @return {String}
 */
export function phraseDeclension(value, wordVariants) {
  const check = value % 10;

  if (check === 0 || check >= 5 || (value >= 11 && value <= 14)) {
    return `${value} ${wordVariants[1]}`;
  }

  if (check === 1) {
    return `${value} ${wordVariants[0]}`;
  }

  return `${value} ${wordVariants[2]}`;
}
