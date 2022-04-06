<template>
  <div class="rating">
    <div class="container">
      <div class="rating__start">
        <p class="rating__finaly">
          Конкурс завершен 4 апреля в 23:59. Сейчас мы проводим подсчёт результатов.
        </p>
        <!-- <h2 class="h2">Рейтинг</h2>

        <div class="rating__text">
          <p class="text">
            Исследуй каждую точку на комбинате,
            собери выделенные ключевые слова и составь
            из них фразу. Специальное окно для ее ввода
            откроется по мере прохождения игры.
          </p>

          <p class="text">
            Твои баллы будут суммироваться с
            баллами других участников из твоего
            колледжа. Поднажми, помоги своему
            учебному заведению занять первое место!
          </p>
        </div> -->
      </div>

      <!-- <ul class="rating__group">
        <li
          class="rating__single"
          v-for="institute in institutes"
          :key="institute.id"
        >
          <p class="rating__points">{{ institute.rating }}</p>
          <p class="rating__institute-name">{{ institute.name }}</p>
        </li>
      </ul> -->
    </div>
  </div>
</template>

<script>
export default {
  name: '',

  props: {
    institutes: {
      type: Array,
      // required: true,
    },
  },
};
</script>

<style scoped>
  .rating {
    padding-top: 50px;
    padding-bottom: 50px;
    position: relative;
  }

  .rating:before {
    content: '';
    background: url('../assets/img/rating/rating_before.svg') no-repeat;
    width: 92px;
    height: 143px;
    position: absolute;
    left: 0;
    bottom: 0;
  }

  .rating:after {
    content: '';
    background: url('../assets/img/rating/rating_after.svg') no-repeat;
    width: 63px;
    height: 218px;
    position: absolute;
    right: 0;
    bottom: 0;
  }

  .rating__group {
    max-width: 940px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 172px);
    column-gap: 20px;
    row-gap: 20px;
    list-style: none;
    padding: 0;
    margin: 0 auto;
  }

  .rating__single {
    text-align: center;
    margin-top: 30px;
  }

  .rating__points {
    width: 100%;
    height: 172px;
    line-height: 172px;
    background: var(--accent-color);
    font-size: 40px;
    font-weight: 900;
    border-radius: 100%;
    margin: 0;
  }

  .rating__institute-name {
    font-size: 12px;
    line-height: 14px;
    color: var(--basic-text-color);
    font-weight: bold;
    margin-top: 20px;
  }

  .rating__text {
    padding-left: 300px;
  }

  .rating__start {
    display: flex;
    margin-bottom: 48px;
    background: url('../assets/img/rating/rating_cloud.svg') no-repeat 0 75%;
  }

  .rating__start .text:last-child {
    margin-top: 30px;
  }

  .rating__finaly {
    height: 300px;
    font-size: 30px;
    text-align: center;
    display: flex;
    align-items: center;
  }

  #map__rating .rating__finaly {
    color: #ffffff;
  }
</style>
