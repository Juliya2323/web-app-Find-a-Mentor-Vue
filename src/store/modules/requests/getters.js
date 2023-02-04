export default {
  requests(state, _, _2, rootGettes) {
    //мы хотим показать не все запрсы а только те, которые относятся к данному ментору по id из rootGetters
    const coachId = rootGettes.userId;
    //названия ключей req можно посмотреть в actions
    return state.requests.filter((req) => req.coachId === coachId);
    //теперь после фильтрации список будет доступен только после регистрации в качестве ментора
  },
  hasRequests(_, getters) {
    return getters.requests && getters.requests.length > 0;
  },
};
