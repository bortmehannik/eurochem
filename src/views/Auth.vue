<template>
  <section class="auth-page">
    <p class="text auth-page__text">
      Если ты уже зарегистрировался, <br>введи данные для авторизации.
      Если нет — пройди быструю регистрацию и отправляйся в путешествие!
    </p>

    <p class="auth-page__btn-wrapper">
      <router-link class="btn auth-page__btn" :to="{ name: 'register' }">
        Зарегистрироваться
      </router-link>

      <router-link class="btn auth-page__btn" :to="{ name: 'login' }">
        Уже есть пропуск
      </router-link>
    </p>
  </section>
</template>

<script>
export default {
  name: 'AuthPage',
};
</script>

<style scoped>
.auth-page {
  height: 100vh;
  background: var(--accent-gradient);
  padding-top: 130px;
}

.auth-page__text {
  text-align: center;
  max-width: 505px;
  margin: 0 auto;
}

.auth-page__btn-wrapper {
  margin-top: 62px;
}

.auth-page__btn {
  display: block;
  width: 250px;
  text-align: center;
  margin: 0 auto 16px auto;
}
</style>
