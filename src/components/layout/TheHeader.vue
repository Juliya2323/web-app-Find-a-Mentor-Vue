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
      <li class="header_list_item">
        <router-link class="header_link" to="/requests">Requests</router-link>
      </li>
    </ul>
  </header>
</template>

<style scoped lang="scss">
.header {
  width: 100%;
  padding: 25px 20px;
  background-color: #4602a0;
  display: flex;
  justify-content: center;
  align-items: center;

  &_link {
    text-decoration: none;
    color: #f391e3;
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border: 1px solid transparent;
    transition: all 0.3s ease-out;

    &:active,
    &:hover,
    &.router-link-active {
      border: 1px solid #f391e3;
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
