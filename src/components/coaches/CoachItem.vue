<template>
  <li class="item">
    <h3 class="item_title">{{ fullName }}</h3>
    <h4 class="item_price">${{ rate }}/hour</h4>
    <div class="item_areas">
      <base-badge
        class="item_area"
        v-for="area in areas"
        :key="area"
        :type="area"
        :title="area"
      ></base-badge>
    </div>
    <div class="item_actions">
      <base-button
        mode="outline"
        link
        class="item_button"
        :to="coachContactLink"
        >Contact</base-button
      >
      <base-button link class="item_button" :to="coachDetailsLink"
        >Details</base-button
      >
    </div>
  </li>
</template>

<script>
export default {
  props: ['id', 'firstName', 'lastName', 'rate', 'areas'],
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName;
    },
    coachContactLink() {
      return '/coaches/' + this.id + '/contact';
      // или указать ссылку через текущую path:
      //return this.$route.path + '/' + this.id + '/contact';
    },
    coachDetailsLink() {
      return '/coaches/' + this.id;
    },
  },
};
</script>

<style scoped lang="scss">
.item {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;

  &_title {
    font-size: 1.5rem;
  }

  &_title,
  &_price {
    margin: 0.5rem 0;
  }

  &_areas {
    margin: 0.5rem 0;
  }

  &_actions {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
