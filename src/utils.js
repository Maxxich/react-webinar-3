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
 * Получение валидного номера страницы из URLSearchParams
 * @param lastPage {Number | undefined} Номер последней страницы
 */
export function getValidPageFromUrlSearchParams(lastPage) {
  const params = new URL(window.location).searchParams;
  let page = parseInt(params.get("_page"));
  if (Number.isInteger(page)) {
    if (page < 1) {
      page = 1;
    } else if (lastPage && (page > lastPage)) {
      page = lastPage;
    };
  } else {
    page = 1;
  };
  return page
}

/**
 * Изменение номера страницы в URLSearchParams
 * @param page {Number} Номер страницы
 */
export function setPageToUrlSearchParams(page) {
  const url = new URL(location);
  url.searchParams.set("_page", page);
  window.history.pushState(null, null, url)
}

