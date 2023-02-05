import { createRouter, createWebHistory } from 'vue-router';
import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachList from './pages/coaches/CoachList.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsRecieved from './pages/requests/RequestsRecieved.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import NotFound from './pages/NotFound.vue';
import store from './store/index.js';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CoachList },
    {
      path: '/coaches/:id',
      component: CoachDetail,
      props: true,
      children: [{ path: 'contact', component: ContactCoach }],
    },
    { path: '/register', component: CoachRegistration, meta: { requeresAuth: true } },
    { path: '/requests', component: RequestsRecieved, meta: { requeresAuth: true } },
    { path: '/auth', component: UserAuth, meta: { requeresUnauth: true } },
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

//чтобы auth, requests и register не были доступны всегда по прямым ссылкам, добавляем guards и meta
router.beforeEach(function(to, from, next) {
  if (to.meta.requeresAuth && !store.getters.isAuthenticated) {
    //если в мета есть requeresAuth и пользователь не зарег-н - то редрект на auth
    next('/auth');
  } else if (to.meta.requeresUnauth && store.getters.isAuthenticated) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
