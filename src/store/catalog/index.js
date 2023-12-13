import StoreModule from "../module";

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class CatalogState extends StoreModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      list: [],
      params: {
        page: 1,
        limit: 10,
        sort: 'order',
        query: '',
        category: ''
      },
      count: 0,
      waiting: false
    }
  }

  /**
   * Инициализация параметров.
   * Восстановление из адреса
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async initParams(newParams = {}) {
    await this.initCategoryOptions()
    const urlParams = new URLSearchParams(window.location.search);
    let validParams = {};
    if (urlParams.has('page')) validParams.page = Number(urlParams.get('page')) || 1;
    if (urlParams.has('limit')) validParams.limit = Math.min(Number(urlParams.get('limit')) || 10, 50);
    if (urlParams.has('sort')) validParams.sort = urlParams.get('sort');
    if (urlParams.has('query')) validParams.query = urlParams.get('query');
    if (urlParams.has('category')) {
      const category = urlParams.get('category');
      if (this.getState().categoryOptions.find(c => c.value === category)) {
        validParams.category = category
      }
    }
    await this.setParams({...this.initState().params, ...validParams, ...newParams}, true);
  }

  /**
   * Инициализация категорий (получение с сервера).
   * @return {Promise<void>}
   */
  async initCategoryOptions() {
    const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
    const json = await response.json();

    // Возвращает дерево с children из полученных категории
    function createTree(array) {
      return array.filter(item => {
        item.children = array.filter(i => ((i.parent) && (i.parent._id === item._id)))
        return item.parent == null;
      })
    };

    // Возвращает массив для опций категорий
    function formatTree(array, depth = 0) {
      if (!array.length) return;
      let parentList = [];
      for (let category of array) {
        let childList = [];
        childList.push({
          value: category._id,
          title: depth 
            ? '-'.repeat(depth) + ' ' + category.title 
            : category.title
        });

        let childrenList = formatTree(category.children, depth + 1);
        if (childrenList) {
          childList = childList.concat(childrenList);
        }
        parentList = parentList.concat(childList);
      }
      return parentList;
    }
    
    this.setState({
      ...this.getState(),
      categoryOptions: [
        {value: '', title: 'Все'},
        ...formatTree(createTree(json.result.items))
      ]
    }, 'Загружен список категорий из АПИ');
  }

  /**
   * Сброс параметров к начальным
   * @param [newParams] {Object} Новые параметры
   * @return {Promise<void>}
   */
  async resetParams(newParams = {}) {
    // Итоговые параметры из начальных, из URL и из переданных явно
    const params = {...this.initState().params, ...newParams};
    // Установка параметров и загрузка данных
    await this.setParams(params);
  }

  /**
   * Установка параметров и загрузка списка товаров
   * @param [newParams] {Object} Новые параметры
   * @param [replaceHistory] {Boolean} Заменить адрес (true) или новая запись в истории браузера (false)
   * @returns {Promise<void>}
   */
  async setParams(newParams = {}, replaceHistory = false) {
    const params = {...this.getState().params, ...newParams};

    // Установка новых параметров и признака загрузки
    this.setState({
      ...this.getState(),
      params,
      waiting: true
    }, 'Установлены параметры каталога');

    // Сохранить параметры в адрес страницы
    let urlSearch = new URLSearchParams(params).toString();
    const url = window.location.pathname + '?' + urlSearch + window.location.hash;
    if (replaceHistory) {
      window.history.replaceState({}, '', url);
    } else {
      window.history.pushState({}, '', url);
    }

    const apiParams = {
      limit: params.limit,
      skip: (params.page - 1) * params.limit,
      fields: 'items(*),count',
      sort: params.sort,
      'search[query]': params.query,
    };

    if (params.category !== '') {
      apiParams['search[category]'] = params.category
    }

    const response = await fetch(`/api/v1/articles?${new URLSearchParams(apiParams)}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      count: json.result.count,
      waiting: false
    }, 'Загружен список товаров из АПИ');
  }
}

export default CatalogState;
