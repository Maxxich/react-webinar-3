import { plural } from "../utils"
import { dictionary } from "./dictinary"
import { locales } from "./locales"
import { pluralDictionary } from "./plural-dictionary"
/**
 * Интернационализация
 * Возвращает вариант с учётом локали
 * @param key {String} Словестная конструкция
 */
export function i(key){
  const localeCode = localStorage.getItem('localeCode') || 'ru-RU'
  if (!locales.find(l => l.code === localeCode)) return key
  if (localeCode === 'ru-RU') return key
  return dictionary[key][localeCode]
} 


/**
 * Интернационализация + плюрализация (требует внесения в pluralDictionary)
 * Возвращает вариант с учётом локали и плюрализации
 * @param amount {Number} Количество
 * @param key {String} Словестная конструкция
 */
export function iPlural(amount, key) {
  const localeCode = localStorage.getItem('localeCode') || 'ru-RU'
  if (!locales.find(l => l.code === localeCode)) return key
  return plural(amount, {...pluralDictionary[key][localeCode]}, localeCode)
}