<template>
  <div>
    <base-dialog :show="!!error" title="An error occured!" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <section class="requests">
    <base-card>
      <header class="requests_header">
        <h2 class="requests_title">Requests Recieved</h2>
      </header>
      <base-spinner v-if="isLoading"></base-spinner>
      <ul class="requests_list" v-else-if="hasRequests && !isLoading">
        <!-- email message берем из actions -->
        <request-item
          v-for="request in recievedRequests"
          :key="request.id"
          :email="request.email"
          :message="request.message"
        ></request-item>
      </ul>
      <h3 class="requests_text" v-else>
        You haven't recieved any requests yet!
      </h3>
    </base-card>
  </section>
  </div>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';
export default {
  computed: {
    recievedRequests() {
      return this.$store.getters['requests/requests'];
    },
    hasRequests() {
      return this.$store.getters['requests/hasRequests'];
    },
  },
  components: { RequestItem },
  data() {
    return {
      isLoading: false,
      error: null
    }
  },
  created() {
    this.loadrequests();
  },
  methods: {
   async loadrequests() {
      // этот метод возвращает промис
      this.isLoading = true;
      try {
        await this.$store.dispatch('requests/fetchRequests');
      } catch (error) {
        this.error = error.message || 'Something failed!';
      }
      this.isLoading = false;
  },
  handleError() {
    this.error = null;
  }
}
};
</script>

<style scoped lang="scss">
.requests {
  &_header {
    text-align: center;
  }

  &_list {
    list-style: none;
    margin: 2rem auto;
    padding: 0;
    max-width: 30rem;
  }

  &_text {
    text-align: center;
  }
}
</style>
