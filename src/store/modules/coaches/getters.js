export default {
    coaches(state) {
      return state.coaches;
    },
    hasCoaches(state) {
        //геттер который возвращает true если у нас есть как минимум 1 ментор 
        return state.coaches && state.coaches.length > 0;
    },
    isCoach(_, getters, _2, rootGetters) {
      // этот метод проверяет зарегистрирован ли как coach пользователь с id
      // тк у нас тут не исп-ся state rootState в кач-ве параметров, поставили _ и _2
      const coaches = getters.coaches;
      const userId = rootGetters.userId;
      return coaches.some(coach => coach.id === userId);
    },
    shouldUpdate(state) {
      const lastFetch = state.lastFetch;

      if (!lastFetch) {
        return true;
      }
      const currentTimeStamp = new Date().getTime();
      // если последнее обновление больше чем 1мин назад - то зафетчим заново, если меньше минуты - не нужно обновлять
      return (currentTimeStamp - lastFetch) / 1000 > 60;
    }
};