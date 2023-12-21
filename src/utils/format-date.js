const monthsDictionary = {
  ['ru']: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
  ['en']: ['January', 'Febrary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
}

const preposition = {
  ['ru']: 'в',
  ['en']: 'at'
}

/**
 * Форматирование даты
 * @param dateString
 * @param lang {string} Код локали
 * @returns {string}
 */

export default function formatDate(dateString, lang = 'ru') {
  const months = monthsDictionary[lang]
  
  const date = new Date(dateString);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  
  return `${day} ${month} ${year} ${preposition[lang]} ${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
};