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
    // Копия во избежание мутирования state
    const cartList = [...this.state.cartList]
    let cartTotalCost = this.state.cartTotalCost
    // Поиск товара в корзине
    const goodInCartList = cartList.find(good => good.code === goodCode)

    if (goodInCartList) {
      // Увеличение количества в корзине
      goodInCartList.quantity++
      cartTotalCost += goodInCartList.price
    } else {
      // Добавление в корзину
      const good = this.state.list.find(good => good.code === goodCode)
      cartList.push({ ...good, quantity: 1})
      cartTotalCost += good.price
    }

    this.setState({
      ...this.state,
      // Мутированная копия массива из state
      cartList,
      cartTotalCost
    })
  };

  /**
   * Удаление товара из корзины по коду
   * @param goodCode
   */
  deleteGoodFromCart(goodCode) {
    const goodToRemove = this.state.cartList
      .find(good => good.code === goodCode)

    const cartTotalCost = this.state.cartTotalCost - (
      goodToRemove.price * goodToRemove.quantity
    )

    this.setState({
      ...this.state,
      cartList: [
        ...this.state.cartList.filter(good => good.code !== goodCode)
      ],
      cartTotalCost
    })
  };
}

export default Store;
