<template>
  <v-form
    class="login-form"
    @submit="onSubmit"
  >
    <div class="form__group">
      <p class="form__set">
        <label class="form__label" for="email">
          Почта
        </label>

        <v-field
          class="form__input"
          name="email"
          rules="required|email"
          type="email"
        />
      </p>

      <v-error-message
        class="form__error"
        name="email"
      />
    </div>

    <div class="form__group">
      <p class="form__set">
        <label class="form__label" for="password">
          Пароль
        </label>

        <v-field
          class="form__input"
          name="password"
          rules="required|min:6"
          type="password"
        />
      </p>

      <v-error-message
        class="form__error"
        name="password"
      />
    </div>
    <div class="form-group">
      <p class="form__set">
        <span class="form__transition">
          Не помнишь логин или пароль? Напиши на почту куратору игры Ульяне:
          <a href="mailto:u.lukyanova@changellenge.ru">u.lukyanova@changellenge.ru</a>
        </span>
      </p>
    </div>

    <button
      v-show="withButton"
      class="btn form__submit login-form__submit"
      type="submit"
    >
      Войти
    </button>
  </v-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';

import {
  required, email, min, confirmed,
} from '@vee-validate/rules';

import { localize } from '@vee-validate/i18n';

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('confirmed', confirmed);

configure({
  generateMessage: localize('ru', {
    messages: {
      required: 'Поле обязательно к заполнению',
      email: 'Почта заполнена некорректно',
      min: 'Минимальное кол-во символов 0:{min}',
      confirmed: 'Поля не совпадают',
    },
  }),
});

export default {
  name: 'LoginForm',

  props: {
    withButton: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    VForm: Form,
    VField: Field,
    VErrorMessage: ErrorMessage,
  },

  computed: {
    ...mapGetters('auth', [
      'isAuthenticated',
    ]),
  },

  methods: {
    ...mapActions('auth', [
      'login',
    ]),

    submitForm() {
      this.$refs.formSubmit.click();
    },

    async onSubmit(formValues) {
      await this.login(formValues);

      if (this.isAuthenticated) {
        this.$router.push({ name: 'home' });
      }
    },
  },
};
</script>

<style scoped>
.login-form {
  width: 100%;
  max-width: 665px;
  padding: 67px;
  background-color: var(--basic-white-color);
  box-shadow: 0 4px 14px 7px var(--basic-shadow-color);
  margin: 0 auto;
}

.login-form__submit {
  display: block;
  margin: 20px auto 0 auto;
}

.form__transition {
  margin-left: 97px;
  font-size: 18px;
  line-height: 22px;
  color: #C4C4C4;
}

.form__transition a {
  color: #C4C4C4;
}
</style>
