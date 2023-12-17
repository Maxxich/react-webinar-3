/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}


/**
 * Форматирование категорий под компонент select
 * @param categoriesArray {[
 *  _id: string,
 *  title: string,
 *  parent: null | {
 *    _id: string
 * } 
 * ]}
 * @returns {[
 *  value: string,
 *  title: string
 * ]}
 */
export function getFormatedCategories(categoriesArray) {
  const formatTitle = (title, depth = 0) => depth === 0
    ? title
    : Array(depth).fill('-').join(' ') +  ' ' + title

  const format = (arr, depth = 0, parentId) => 
    arr
      .filter(c => (
        // Фильтр по корневым родителям, если нет parentId
        c.parent === null && !parentId
        || 
        // Фильтр по прямому потомку, если передан parentId
        c.parent?._id === parentId && parentId
      ))
      .reduce((acc, c) => acc.concat(
          [{value: c._id, title: formatTitle(c.title, depth)}],
          format(arr, depth + 1, c._id)
      ), [])
  return format(categoriesArray)
}