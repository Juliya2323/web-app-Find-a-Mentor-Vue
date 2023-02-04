<template>
  <li class="request">
    <div>
      <a :href="emailLink" class="request_link">{{ email }}</a>
    </div>
    <p class="request_message">{{ message }}</p>
  </li>
</template>

<script>
export default {
  //props берем из requestsRecieved.vue
  props: ['email', 'message'],
  computed: {
    emailLink() {
      return 'mailto:' + this.email;
    },
  },
};
</script>

<style scoped lang="scss">
.request {
  margin: 1rem 0;
  border: 1px solid #ccc;
  padding: 1rem;

  &_link {
    color: #3d008d;
    text-decoration: none;
    font-weight: bold;

    &:hover,
    &:active {
      color: #8d007a;
    }
  }

  &_message {
    margin: 0.5rem 0 0 0;
  }
}
</style>
