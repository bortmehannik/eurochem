<template>
  <section class="auth">
    <div class="container">
      <h1 class="auth__title">
        Чтобы пройти на комбинат введи данные и экипируйся
      </h1>
      <p class="text form-info__text">
        На всех предприятиях ЕвроХим действуют правила
        охраны труда: каждый сотрудник производства носит
        спецодежду. Здесь заботятся о безопасности людей!
        Чтобы надеть все элементы твоего нового костюма,
        кликни на них в нужном порядке.
      </p>
    </div>
    <avatar @ready="onReady" />

    <div class="container">

      <router-view ref="auth" />

      <div class="form-info">
        <p class="form-info__policy">
          Нажимая на кнопку «Заступить на смену»,
          ты соглашаешься с
          <a
            target="_blank"
            href="https://changellenge.com/personal-data-policy/">
            политикой обработки
          </a>
          персональных данных. и эту ссылку на наш
          сайт по перс. данные
        </p>
        <button
          class="btn form-info__btn"
          type="button"
          @click="submitForm"
          :disabled="!isReady"
        >
          Заступить на смену
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import Avatar from '@/components/Avatar.vue';

export default {
  name: 'AuthWrapper',

  components: {
    Avatar,
  },

  data() {
    return {
      formSubmitButton: null,
      isReady: false,
    };
  },

  mounted() {
    this.formSubmitButton = document.querySelector('.form__submit');
  },

  methods: {
    submitForm() {
      this.formSubmitButton.click();
    },

    onReady() {
      this.isReady = true;
    },
  },
};
</script>

<style>
.auth {
  padding-bottom: 80px;
}

.form {
  background-color: var(--basic-white-color);
  box-shadow: 0 4px 14px 7px var(--basic-shadow-color);
}

.form__set {
  display: flex;
  justify-content: space-between;
  margin: 0;
}

.form__group:not(:last-of-type) {
  margin-bottom: 32px;
}

.form__label {
  flex-shrink: 0;
  font-size: 22px;
}

.form__input {
  width: 100%;
  font-size: 22px;
  background-color: var(--basic-white-color);
  border: 0;
  border-radius: 0;
  border-bottom: 1px solid var(--basic-text-color);
  outline: none;
  margin-left: 20px;
}

.form__input option {
  background: var(--basic-white-color);
}

.form__error {
  display: block;
  color: var(--error-color);
  margin-top: 12px;
}
</style>

<style scoped>
.auth__title {
  font-size: 50px;
  font-weight: 900;
  line-height: 61px;
  color: var(--accent-text-color);
  margin: 50px 0 82px;
}

.form-info {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-top: 85px;
}

.form-info__text {
  width: 35%;
}

.form-info__btn {
  width: 30%;
}

.form-info__policy {
  max-width: 60%;
  color: var(--calculator-buttons-color);
  font-size: 15px;
}

.form-info__policy a {
  color: var(--calculator-buttons-color);
  cursor: pointer;
}
</style>
