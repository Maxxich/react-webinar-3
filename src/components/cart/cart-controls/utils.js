import { plural } from "../../../utils";

/**
 * Форматирует строку с нужной формой для слова "товар"
 * @param count {Number} Число.
 * @returns {*|string}
 */
export function getGoodWordForm(count) {
  return plural(count, {
    'one': 'товар',
    'few': 'товара',
    'many': 'товаров',
    'other': 'товара',
  })
}