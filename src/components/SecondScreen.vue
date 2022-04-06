<template>
  <section class="second" id="second">
    <div class="container">
      <div class="content">
        <div class="container-small">
          <h2 class="h2">Ты попал в будущее — что будешь делать?</h2>
          <div class="second__text-block">
            <p class="text">
              Твое первое лето после выпуска из колледжа.
              Ты защитил диплом и возвращаешься домой.
              Думаешь о том, что нужно скорее найти работу,
              чтобы купить машину, а пока — автобус.
              Мягкая тряска убаюкивает, и ты засыпаешь.
              <img :src="require('@/assets/img/second-screen/bus.svg')" alt="">
            </p>
            <p class="text">
              Вот ты открыл глаза… не та остановка. ЕвроХим?
              Где-то я уже слышал это название…
              <img class="absolute" :src="require('@/assets/img/second-screen/screw.svg')" alt="">
            </p>
            <p class="text">
              Давай посмотрим в телефон: 2035-й год! Как такое возможно?!
              Через окно автобуса ты видишь огромное здание комбината.
              На проходной снуют люди. Видимо, идут на смену. Наверное,
              и тебе туда — делать-то больше нечего.
            </p>
            <p class="text">
              Странно, но все здороваются с тобой и называют
              по имени-отчеству. Судя по всему, ты какой-то начальник.
              Нужно попасть на предприятие и разобраться,
              что происходит.
            </p>
          </div>
          <button @click="scrollToElement('third')" class="btn">Пройти дальше</button>
          <img class="second__img" :src="require('@/assets/img/second-screen/bg-house.svg')" alt="">
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
    .second {
      padding: 50px 0 0 0;
    }

    .second .h2 {
      width: 100%;
    }

    .second__img {
      display: block;
      margin: 47px auto 0 auto;
    }

    .text {
      margin-top: 45px;
      width: 70%;
    }

    .text:first-child {
      position: relative;
      box-sizing: content-box;
      width: 100%;
    }

    .text:nth-child(2) {
      position: relative;
      box-sizing: content-box;
      width: 100%;
    }

    .text:first-child img,
    .text:nth-child(2) img {
      margin: 0 auto;
      display: block;
      margin-top: 60px;
      margin-bottom: 60px;
    }

    .text:nth-child(3) {
      position: relative;
      box-sizing: content-box;
      width: 100%;
    }

    .text:nth-child(4) {
      width: 100%;
    }

    .btn {
      margin-top: 45px;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    .text .absolute {
      position: absolute;
      top: 0;
      margin-top: 0;
      margin-bottom: 0;
      left: -193px;
    }
</style>

<script>
export default {
  name: 'SecondScreen',

  props: {
    scrollToElement: {
      type: Function,
    },
  },
};
</script>
