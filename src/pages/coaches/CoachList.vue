<template>
  <div>
    <base-dialog :show="!!error" title="An error occured!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section class="coaches">
      <coach-filter @change-filter="setFilters"></coach-filter>
      <base-card>
        <div class="coaches_controls">
          <base-button mode="outline" @click="loadCoaches(true)"
            >Refresh</base-button
          >
          <base-button link to="/auth?redirect=register" v-if="!isLoggedIn">Login to Register as a Coach</base-button>
          <!-- эта кнопка не д.б. видна, если пользователь не зарег-н. тогда показывается кнопка Login -->
          <!-- но т.к. если ввести прямую ссылку CoachRegistration все равно доступна, поэтому добавить guards в beforeEach() в router.js-->
          <base-button v-if="!isCoach && !isLoading && isLoggedIn" link to="/register"
            >Register as a Coach</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul class="coaches_list" v-else-if="hasCoaches">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :firstName="coach.firstName"
            :lastName="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          ></coach-item>
        </ul>
        <h3 v-else>No coaches found.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

export default {
  data() {
    return {
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
      isLoading: false,
      error: null,
    };
  },
  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes('career')) {
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
      // если пользователь уже зарегистрирован как coach то убираем кнопку для регистрации через v-if
    },
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    }
  },
  created() {
    this.loadCoaches();
  },
  components: { CoachItem, CoachFilter },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches', {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      //дожидаемся завершения через await и ставим статус загрузки на false
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped lang="scss">
.coaches_list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.coaches_controls {
  display: flex;
  justify-content: space-between;
}
</style>
