let uniqueNumber = 0;

  /**
   * Возвращает уникальное число в рамках сессии, используя замыкание
   * @returns {number} Уникальное число в рамках сессии
   */
export function generateUniqueNumber() {
  uniqueNumber++;
  return uniqueNumber;
}