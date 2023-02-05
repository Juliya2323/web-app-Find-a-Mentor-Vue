import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    //для этого модуля не используем namespaced
    state() {
        return {
            userId: null,
            token: null,
            didAutoLogout: false
        }
    },
    mutations,
    actions,
    getters
}