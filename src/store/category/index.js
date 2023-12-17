import { getFormatedCategories } from "../../utils";
import StoreModule from "../module";

/**
 * Состояние списка категорий
 */
class CategoryState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      list: [],
      waiting: false
    }
  }

  /**
   * Инициализация категорий (получение с сервера).
   * @return {Promise<void>}
   */
  async initCategories() {
    this.setState({
      ...this.getState(),
      waiting: true
    })
    try {
      const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
      const json = await response.json();
      this.setState({
        ...this.getState(),
        list: [
          {value: '', title: 'Все'},
          ...getFormatedCategories(json.result.items)
        ],
        waiting: false
      }, 'Загружен список категорий из АПИ')
    } catch (error) {
      this.setState({
        ...this.getState(),
        list: [
          {value: '', title: 'Все'},
        ],
        waiting: false
      }, 'Ошибка при загрузке списока категорий из АПИ')
    }
    ;
  }

 
}

export default CategoryState;
