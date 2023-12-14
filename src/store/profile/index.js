import StoreModule from "../module";

/**
 * Информация о профиле авторизрованного пользователя
 */
class ProfileState extends StoreModule {

  initState() {
    return {
      data: {},
      waiting: false 
    }
  }

  /**
   * Загрузка профиля
   * @param token {String}
   * @return {Promise<void>}
   */
  async load(token) {
    this.setState({
      data: {},
      waiting: true
    });

    if (!token) return

    try {
      const response = await fetch(`/api/v1/users/self?fields=*`, {
        headers: {
          'X-Token': token
        }
      });
      const json = await response.json();
      this.setState({
        data: {
          name: json.result.profile.name,
          phone: json.result.profile.phone,
          email: json.result.email
        },
        waiting: false
      }, 'Загружен профиль из АПИ');
    } catch (e) {
      this.setState({
        data: {},
        waiting: false
      });
    }
  }

  /**
   * Очистка профиля
   * @return {Promise<void>}
   */
  clear() {
    this.setState({
      ...this.initState()
    })
  }
}

export default ProfileState;
