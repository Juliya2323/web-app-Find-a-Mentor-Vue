export default {
  userId(state) {
    return state.userId;
  },
  token(state) {
    return state.token;
  },
  isAuthenticated(state) {
    //если есть token - то authenticated. приводим к булеан с помощью !!
    return !!state.token;
  },
  didAutoLogout(state) {
    return state.didAutoLogout;
  }
};
