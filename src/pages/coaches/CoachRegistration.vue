<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';
export default {
  components: { CoachForm },
  methods: {
    saveData(data) {
      this.$store.dispatch('coaches/registerCoach', data);
      //replace то же самое что push (азница в том что мы не возвращаемся на страницу назад)
      this.$router.replace('/coaches');
    },
  },
};
</script>
