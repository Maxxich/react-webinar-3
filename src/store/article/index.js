import { codeGenerator } from "../../utils";
import StoreModule from "../module";

class Article extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      status: 'idle',
      data: undefined
    }
  }

  async load(_id) {
    this.setState({
      status: 'pending',
      data: undefined
    })
    const response = await fetch(`/api/v1/articles/${_id}?fields=description,madeIn(title,code),category(title),title,price,edition`);
    if (!response.ok) {
      return this.setState({
        status: 'rejected'
      })
    }
    const json = await response.json();
    this.setState({
      ...this.getState(),
      data: json.result,
      status: 'fulfilled'
    }, 'Загружен товар из АПИ');
  }

  reset() {
    this.setState(this.initState(), 'Сброс данных из Article');
  }
}

export default Article