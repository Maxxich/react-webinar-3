import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      lastPage: undefined,
      limit: 10
    }
  }

  async load(page) {
    const limit = this.getState().limit
    const skip = limit*(page-1)
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      lastPage: Math.ceil(json.result.count / limit)
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
