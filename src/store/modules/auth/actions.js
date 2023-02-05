let timer;

export default {
    //методы login и signup отличаются только ссылками, в остальном - всё то же. поэтому добавить метод auth, чтобы код не дублировался
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload, 
      mode: 'login'
    });
  },
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload, 
      mode: 'signup'
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCh9s34fYEFTrJIXKs3x1lVQ_ErFPMWPr8';
    if (mode === 'signup') {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCh9s34fYEFTrJIXKs3x1lVQ_ErFPMWPr8';
    }
    const response = await fetch(
      // после =  записан api key (ссылка на проект на firebase)
      url,
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to ayuthenticate.'
      );
      throw error;
    }

    //из секунд в милисекунды --- /1000
    const expiresIn = +responseData.expiresIn * 1000;
    const expirationDate = new Date().getTime() + expiresIn

    // чтобы данные регистрации не терялись при перезагрузке/переходах по страницам добавим auto login
    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    timer = setTimeout(function() {
      context.dispatch('autoLogout')
    }, expiresIn);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId
    });
  },
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);

    context.commit('setUser', {
      userId: null,
      token: null
    })
  },
  autoLogin(context) {
    // проверяем есть ли данные в localStorage - тогда используем их в created в App.vue
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    const expiresIn = +tokenExpiration - new Date().getTime();
    if (expiresIn < 0) {
      return;
    }

    timer = setTimeout(function() {
      context.dispatch('autoLogout');
    }, expiresIn);
    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId
      })
    }
  },
  autoLogout(context) {
    context.dispatch('logout');
    //если время токена истекло, добавим редирект setAutoLogout из mutation + App.vue:
    context.commit('setAutoLogout');
  }
};
