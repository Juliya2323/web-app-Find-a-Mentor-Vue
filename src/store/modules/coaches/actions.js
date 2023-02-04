export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      //id: new Date().toISOString(),
      firstName: data.first,
      lastName: data.last,
      areas: data.areas,
      description: data.descr,
      hourlyRate: data.rate,
    };
    //fetch возвращает промис. и вместо того чтобы использовать .then() мы используем async await
    const response = await fetch(
      `https://learning-app-aefd1-default-rtdb.firebaseio.com/coaches/${userId}.json`,
      {
        // put отличается от post тем что данные будут записаны или перезаписаны!, если они существовали
        //а у нас можно зарегистрироваться ментором только 1 раз- то есть 1 ментор на пользователя
        //а при новые post вводимые данные будут добавляться независимо от того сущ-ют они или нет
        method: 'PUT',
        // конвертируем передаваемые на firebase данные в json формат:
        body: JSON.stringify(coachData),
      }
    );

    if (!response.ok) {
      //... 
    }
    // а если ответ от сервера ок и все промисы выполнены, то выполнится этот код:
    context.commit('registerCoach', { ...coachData, id: userId });
  },

  async loadCoaches(context, payload) {
    // если обновляли больше 1 мин назад то надо зафетчить, если нет - этот метд не будет выполняться
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }

    //по дефолту в fetch стоит GET, поэтому объект во втором аргументе не передаем
    const response = await fetch(
      `https://learning-app-aefd1-default-rtdb.firebaseio.com/coaches.json`
    );
    // далее полученный ответ конвертируем, как только он получен:
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    // на сервере данные представлены как массив объектов-менторов с id, эти данные нам надо перезаписать в прежний вид и добавить id:
    const coaches = [];
    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        areas: responseData[key].areas,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
      };
      coaches.push(coach);
    }
    context.commit('setCoaches', coaches);

    context.commit('setFetchTimestamp');

    //этот метод получения менторов добавлем на кнопку refresh и в created life-cycle hook в CoachList
  },
};
