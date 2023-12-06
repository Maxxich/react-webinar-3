import { dictionary, locales } from "./dictinary"
/**
 * Интернационализация
 * Возвращает вариант с учётом локали
 * @param key {String} Словестная конструкция
 */
export function i(key){
  const locale = localStorage.getItem('locale') || 'RU'
  if (!locales.includes(locale)) return key
  if (locale === 'RU') return key
  return dictionary[key][locale]
} 