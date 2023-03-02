<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 2rem auto;
  max-width: 40rem;

  @media screen and (max-width: 685px) {
    max-width: 27rem;
  }

  @media screen and (max-width: 470px) {
    flex-direction: column;
    max-width: 20rem;
  }
}
</style>
