import StoreModule from "../module";

/**
 * Аутентификация
 */
class AuthState extends StoreModule {

  initState() {
    return {
      data: {
        token: undefined,
        name: undefined
      },
      isAuthenticated: false,
      waitingForAuth: true,
      errorLogin: ''
    }
  }

    /**
   * Вход в аккаунт по токену при инициализации
   * @return {Promise<void>}
   */
  async initAuthentication() {
    const token = localStorage.getItem('X-Token')
    if (!token) {
      return this.setState({
        data: {},
        waitingForAuth: false
      });
    }

    try {
      const response = await fetch('/api/v1/users/self?fields=profile(name)', {
        headers: {
          'X-Token': token
        }
      })
      const json = await response.json()
      this.setState({
        data: {
          name: json.result.profile.name,
          token
        },
        waitingForAuth: false,
        isAuthenticated: true
      });
    } catch (error) {
      localStorage.removeItem('X-Token')
      this.setState({
        data: {},
        waitingForAuth: false
      });
    }
  }

  /**
   * Вход в аккаунт по логину и паролю
   * @param login {String}
   * @param password {String}
   * @return {Promise<void>}
   */
  async login({login, password}){
    this.setState({
      ...this.getState(),
      errorLogin: '',
      waitingForAuth: true
    })
    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'POST',
        body: JSON.stringify({login, password}),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const json = await response.json();
      if (!response.ok) {
        return this.setState({
          ...this.getState(),
          waitingForAuth: false,
          errorLogin: json.error.data.issues[0].message
        })
      }
      this.setState({
        ...this.getState(),
        data: {
          token: json.result.token,
          name: json.result.user.profile.name,
        },
        waitingForAuth: false,
        isAuthenticated: true
      })
      localStorage.setItem('X-Token', json.result.token)
    } catch (error) {
      this.setState({
        ...this.getState(),
        waitingForAuth: false,
        errorLogin: 'Произошла неожиданная ошибка'
      })
    }
  }

  async logout() {
    this.setState({
      ...this.initState(),
      waitingForAuth: false
    })
    const token = localStorage.getItem('X-Token')
    try {
      await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'X-Token': token
        }
      })
    } catch (error) {
      
    } finally {
      localStorage.removeItem('X-Token')
    }

  }
}

export default AuthState;
