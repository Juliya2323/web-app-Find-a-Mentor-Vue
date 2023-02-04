<template>
  <form class="contact_form" @submit.prevent="submitForm">
    <div class="contact_form_control">
      <label class="contact_form_title" for="email">Your Email</label>
      <input
        class="contact_form_input"
        type="email"
        id="email"
        v-model.trim="email"
      />
    </div>
    <div class="contact_form_control">
      <label class="contact_form_title" for="message">Message</label>
      <textarea
        class="contact_form_input"
        rows="5"
        id="message"
        v-model.trim="message"
      ></textarea>
    </div>
    <p class="contact_form_errors" v-if="!formIsValid">
      Please enter a valid e-mail and non-empty message.
    </p>
    <div class="contact_form_actions">
      <base-button>Send Message</base-button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      message: '',
      formIsValid: true,
    };
  },
  methods: {
    submitForm() {
      //сначала нужно сделать форму валидной в случае если до этого были ошибки, их надо очистить
      this.formIsValid = true;
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.message === ''
      ) {
        this.formIsValid = false;
        return;
        // return нужен чтобы в случае невалидных инпутов остальной код функции не выполнялся
      }
      //contactCoach - это actions
      this.$store.dispatch('requests/contactCoach', {
        email: this.email,
        message: this.message,
        coachId: this.$route.params.id,
        //id также можно передать через props: true в router.js
      });
      this.$router.replace('/coaches');
    },
  },
};
</script>

<style scoped lang="scss">
.contact_form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;

  &_control {
    margin: 0.5rem 0;
  }

  &_label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
  }

  &_input {
    display: block;
    width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    padding: 0.15rem;

    &:focus {
        border-color: #3d008d;
        background-color: #faf6ff;
        outline: none;
    }
  }

  &_actions {
    text-align: center;
  }

  &_errors {
    font-weight: bold;
    color: red;
  }
}
</style>
