<template>
  <header class="header">
    <nav class="header_nav">
      <h1 class="header_title">
        <router-link class="header_logo" to="/">Find a coach</router-link>
      </h1>
    </nav>
    <ul class="header_list">
      <li class="header_list_item">
        <router-link class="header_link" to="/coaches">All coaches</router-link>
      </li>
      <!-- кнопка requests доступна только после авторизации. иначе- кнопка login -->
      <li class="header_list_item" v-if="isLoggedIn">
        <router-link class="header_link" to="/requests">Requests</router-link>
      </li>
      <li v-else>
        <router-link class="header_link" to="/auth">Login</router-link>
      </li>
      <li v-if="isLoggedIn">
        <base-button @click="logout">Logout</base-button>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      //после logout добавляем редирект на другую страницу
      this.$router.replace('/coaches');
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  padding: 25px 20px;
  background-color: #4602a0;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 533px) {
    flex-direction: column;
    gap: 20px;
  }

  &_link {
    text-decoration: none;
    color: #f391e3;
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border: 1px solid transparent;
    border-radius: 15px;
    transition: all 0.3s ease-out;

    &:active,
    &:hover,
    &.router-link-active {
      border: 1px solid #f391e3;
    }

    @media screen and (max-width: 600px) {
      padding: 0.75rem 0.7rem;
    }
  }

  

  &_title {
    margin: 0;
  }

  &_logo {
    color: white;
    margin: 0;
    text-decoration: none;
    font-size: 30px;
    cursor: pointer;
    transition: all 0.3s ease-out;

    &:hover,
    &:active {
      border-color: transparent;
      color: #f391e3;
    }
  }

 

  &_nav {
    width: 100%;
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &_list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;

    &_item {
      margin: 0;

      &:active {
        border: 1px solid #f391e3;
      }
    }
  }
}
</style>
