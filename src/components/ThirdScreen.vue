<template>
  <section class="third" id="third">
    <div class="container">
      <div class="content">
        <h2 class="h2">Собери свою историю на карте комбинатов</h2>
        <div class="third__text-block">
          <p class="text">
            <b>Внимательно исследуй карту и собери свою историю.</b>
            Постарайся ничего не пропустить: в разных точках карты
            спрятаны детали истории о том, как ты здесь очутился,
            а также <b class="success-color">секретные слова</b>.
            Собери их и составь ключевую
            фразу для участия в розыгрыше призов.
          </p>
        </div>
        <router-link :to="{ name: 'auth' }" class="btn">Начать путешествие</router-link>
      </div>
      <img :src="require('@/assets/img/third-screen/pipe.svg')" alt="">
    </div>
  </section>
</template>

<style scoped>
  .h2 {
    margin-bottom: 55px;
  }

  .third {
    padding: 50px 0 57px 0;
    background: var(--accent-text-color);
  }

  .third *:not(.btn) {
    color: var(--basic-white-color);
  }

  .third .container > img {
    position: absolute;
    bottom: -57px;
    right: 0;
  }

  .text {
    margin-top: 35px;
    width: 60%;
  }

  .text b {
    font-weight: bold;
  }

  .btn {
    margin-top: 25px;
    display: inline-block;
    width: 40%;
    text-align: center;
    margin-top: 60px;
  }
</style>
