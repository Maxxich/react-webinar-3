  /**
   * Возвращает слово после числительного в нужной форме 
   * variant1 - дефолтный вариант
   * variant2 - почле числсительных ..2, ..3, ..4, не включая ..12, ..13, ..14
   * @param count {number}
   * @param variant1 {string}
   * @param variant2 {string}
   * @returns {Function} Функция отписки
   */
export function getWordAfterCount(count, variant1, variant2) {
    const stringValue = String(count)

    // Если запись числа оканчивается цифрами '12', '13', '14'
    if (count > 10) {
        const twoLastNumbers = stringValue.slice(stringValue.length-2, stringValue.length)
        if (['12','13','14'].includes(twoLastNumbers)) return variant1
    }

    // Если запись числа оканчивается цифрами '2', '3', '4', но не '12', '13', '14'
    const lastNumber = stringValue[stringValue.length-1]
    if (['2','3','4'].includes(lastNumber)) return variant2
    
    // Все остальные варианты записи
    return variant1
}