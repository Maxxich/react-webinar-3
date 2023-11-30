/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление товара в корзину по коду
   * @param goodCode
   */
  addGoodToCart(goodCode) {
    const updatedList = this.state.list.map(good => {
      if (good.code === goodCode) {
        good.quantityInCart = (good.quantityInCart || 0) + 1
      }
      return good
    })
    this.setState({
      ...this.state,
      list: updatedList
    })
  };

  /**
   * Удаление товара из корзины по коду
   * @param goodCode
   */
  deleteGoodFromCart(goodCode) {
    const updatedList = this.state.list.map(good => {
      if (good.code === goodCode) {
        delete good.quantityInCart
      }
      return good
    })
    this.setState({
      ...this.state,
      list: updatedList
    })
  };
}

export default Store;
