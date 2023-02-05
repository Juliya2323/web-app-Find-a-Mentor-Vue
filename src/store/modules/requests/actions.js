export default {
    //отправляем данные на сервер:
    async contactCoach(context, payload) {
        const newRequest = {
            //coachId: payload.coachId,
            email: payload.email,
            message: payload.message
        };
        const response = await fetch(`https://learning-app-aefd1-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`, {
            method: 'POST',
            body: JSON.stringify(newRequest)
        });
       const responseData = await response.json();

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to send a request.');
            throw error;
        }

       //   и добавляем id в объект newRequest, который генерирует firebase
       newRequest.id = responseData.name;
       newRequest.coachId = payload.coachId;
        context.commit('addRequest', newRequest);
    },
    //загружаем данные с сервера:
    async fetchRequests(context) {
        // регистрация в качестве ментора и список запросов доступны только авторизированным пользователям. добавляем к ссылке ?auth=` + token
       const token = context.rootGetters.token;
       const coachId = context.rootGetters.userId;
       const response = await fetch(`https://learning-app-aefd1-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=` + token);
       const responseData = await response.json();
       

       if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch a request.');
            throw error;
       }
       
       // если response ok -- форматируем данные в нужный формат:
       const requests = [];

       for (const key in responseData) {
            const request = {
                id: key,
                coachId: coachId,
                email: responseData[key].email,
                message: responseData[key].message,
            };
            requests.push(request);
       }
       context.commit('setRequests', requests);
    }
}