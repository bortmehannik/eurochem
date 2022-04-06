<template>
  <section class="form register-form">
    <h2 class="register-form__title">Пропуск</h2>

    <v-form
      class="register-form__form"
      @submit="onSubmit"
    >
      <div class="form__group">
        <p class="form__set">
          <label class="form__label" for="name">
            Имя
          </label>

          <v-field
            class="form__input"
            name="name"
            rules="required"
          />
        </p>

        <v-error-message
          class="form__error"
          name="name"
        />
      </div>

      <div class="form__group">
        <p class="form__set">
          <label class="form__label" for="surname">
            Фамилия
          </label>

          <v-field
            class="form__input"
            name="surname"
            rules="required"
          />
        </p>

        <v-error-message
          class="form__error"
          name="surname"
        />
      </div>

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
          <label class="form__label" for="phone">
            Телефон
          </label>

          <v-field
            class="form__input"
            name="phone"
            rules="required"
            type="text"
            v-maska="'+7 (###) ###-##-##'"
          />
        </p>

        <v-error-message
          class="form__error"
          name="phone"
        />
      </div>

      <div class="form__group">
        <p class="form__set">
          <label class="form__label" for="institute">
            Колледж
          </label>

          <v-field
            class="form__input"
            name="institute_id"
            as="select"
            v-model="instituteId"
          >
            <option value="0">
              Другой
            </option>

            <option
              v-for="institute in institutes"
              :value="institute.id"
              :key="institute.id"
            >
              {{ institute.name }}
            </option>
          </v-field>
        </p>

        <v-error-message
          class="form__error"
          name="institute"
        />
      </div>

      <div
        v-if="instituteId == 0"
        class="form__group"
      >
        <p class="form__set">
          <label class="form__label" for="institute_name">
            Название
          </label>

          <v-field
            class="form__input"
            name="institute_name"
            rules="required"
          />
        </p>

        <v-error-message
          class="form__error"
          name="institute_name"
        />
      </div>

      <div class="form__group">
        <p class="form__set">
          <label class="form__label" for="course">
            Курс
          </label>

          <v-field
            class="form__input"
            name="course"
            as="select"
          >
            <option
              v-for="course in courses"
              :key="course"
              :value="course"
            >
              {{ course }}
            </option>
          </v-field>
        </p>

        <v-error-message
          class="form__error"
          name="course"
        />
      </div>

      <div class="form__group">
        <p class="form__set">
          <label class="form__label" for="specialty">
            Специальность
          </label>

          <v-field
            class="form__input"
            name="specialty"
            type="text"
          />
        </p>

        <v-error-message
          class="form__error"
          name="specialty"
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

      <div class="form__group">
        <p class="form__set">
          <label class="form__label" for="password_confirmation">
            Повторите пароль
          </label>

          <v-field
            class="form__input"
            name="password_confirmation"
            rules="required|confirmed:@password"
            type="password"
          />
        </p>

        <v-error-message
          class="form__error"
          name="password_confirmation"
        />
      </div>

      <button ref="formSubmit" v-show="false" type="submit" class="form__submit">
        Отправить
      </button>
    </v-form>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import { maska } from 'maska';

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
  name: 'RegisterForm',

  directives: { maska },

  components: {
    VForm: Form,
    VField: Field,
    VErrorMessage: ErrorMessage,
  },

  props: {
    institutes: {
      type: Array,
      required: true,
    },
  },

  emits: {
    success: null,
  },

  data() {
    return {
      instituteId: null,
      courses: [1, 2, 3, 4, 5],
    };
  },

  computed: {
    ...mapGetters('auth', [
      'isAuthenticated',
    ]),
  },

  methods: {
    ...mapActions('auth', [
      'register',
    ]),

    submitForm() {
      this.$refs.formSubmit.click();
    },

    async onSubmit(formValues) {
      await this.register(formValues);

      if (this.isAuthenticated) {
        this.$router.push({ name: 'home' });
      }
    },
  },
};
</script>

<style scoped>
.register-form {
  padding: 39px 86px 86px;
  background-image: url(~@/assets/icons/pass.svg);
  background-size: 350px 522px;
  background-position: top 38px right;
  background-repeat: no-repeat;
}

.register-form__title {
  font-size: 50px;
  font-weight: 900;
  color: var(--basic-white-color);
  text-shadow: 1px 0 1px var(--basic-text-color),
    0 1px 1px var(--basic-text-color),
    -1px 0 1px var(--basic-text-color),
    0 -1px 1px var(--basic-text-color);
  line-height: 60px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0;
  margin-bottom: 32px;
}

.register-form__form {
  width: 525px;
}
</style>
