<template>
  <div class="start">
    <div class="container">
      <div class="content">
        <div class="start__logo">
          <img src="../assets/img/first-screen/logo.svg" alt="Еврохим">
        </div>
        <div class="start__info">
          <h1 class="h1">
            Комбинатус <br><span>2035</span>
          </h1>
          <p class="start__descr">
            Собери историю своего персонажа и узнай секреты промышленного производства
          </p>
          <button
            @click="scrollToElement('second')"
            class="btn btn--black">
            Начать путешествие
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
    .start {
        background: var(--start-gradient);
        position: relative;
    }

    .start .container {
      padding: 50px 0 80px 0;
    }

    .start .container:before {
        content: '';
        background: url('../assets/img/first-screen/start.svg');
        position: absolute;
        width: 689px;
        height: 100%;
        top: 0;
        right: 0;
        background-size: cover;
    }

    .start__descr {
        font-weight: 300;
        font-size: 20px;
        line-height: 24px;
        width: 35%;
        margin-bottom: 45px;
    }
</style>

<script>
export default {
  name: 'StartScreen',

  props: {
    scrollToElement: {
      type: Function,
    },
  },
};
</script>
