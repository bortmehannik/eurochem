<template>
  <section class="museum" id="museum">
    <div class="container">
      <h2 class="h2 museum__title">Интерактивный музей комбината</h2>
      <p class="text museum__subtitle">
        Эта игра поможет узнать предприятия Горнорудного дивизиона
        компании «ЕвроХим» лучше, даже
        если ты из <b class="success-color">тех</b>, кто впервые слышит о ней.
        Здесь есть реальные факты о производствах — попробуй соотнести их с объектами!
        На каждую картинку — по пять фактов.
      </p>
      <div class="museum__all-facts">
        <div class="museum__cloud">
          <span>Перетащите факт <br>в верную колонку</span>
        </div>
        <div class="museum__images">
          <img
            v-if="isFirstShow"
            src="../assets/img/museum/museum_instruction.svg"
            alt=""
            class="museum__instruction">
          <div class="museum__group">
            <img src="../assets/img/museum/gear.svg" alt="">
            <img src="../assets/img/museum/test-tube.svg" alt="">
          </div>
        </div>
        <draggable
          class="list-group"
          :list="isActiveFact"
          :group="{name: 'facts-group'}"
          itemKey="name"
          ghost-class="custom-ghost"
          @change="changeFacts"
          @start="isGhost = true"
          @end="isGhost = false"
        >
          <template #item="{ element }">
            <div class="list-group__item-all">{{ element.name }}</div>
          </template>
        </draggable>
      </div>
      <div class="museum__current-facts">
        <ul class="museum__facts-images">
          <li
            v-for="(fact, i) in facts.images"
            :key="i"
            :data-key="i"
            @mouseover="setActiveClass(i)"
            @mouseleave="removeActiveClass(i)"
          >
            <img :src="require(`@/assets/img/museum/${fact.image}`)" alt="">
            <div class="museum__facts-descr">
              {{ fact.description }}
            </div>
            <p class="museum__facts-title">{{ fact.title }}</p>
            <p class="museum__facts-subtitle">{{ fact.subtitle }}</p>
            <a
              class="museum__facts-link"
              target="_blank"
              :href="fact.link">
              Больше информации
            </a>
          </li>
        </ul>
        <ul class="museum__distributed-facts">
          <li v-for="(fact, i) in currentFacts" :key="i" :class="{'ghost': isGhost}">
            <draggable
              class="list-group"
              :list="fact"
              :group="{name: 'facts-group', put: currentFacts[i].length < 5}"
              itemKey="name"
              ghost-class="custom-ghost"
              @start="isGhost = true"
              @end="isGhost = false"
              :data-id="currentFacts[i].length"
            >
              <template #item="{ element }">
                <div class="list-group__item">{{ element.name }}</div>
              </template>
            </draggable>
          </li>
        </ul>
      </div>
      <button
        :disabled="isActiveFact.length !== 0"
        @click="checkFacts" class="btn">
        Проверить
      </button>
    </div>
    <teleport to="body">
      <popup-result
        v-model="isOpenPopupResult"
        :type="resultPopupType"
      >
        <template #title>
          <p v-html="resultPopupTitle" />
        </template>

        <template #description>
          <p v-html="resultPopupDescription" />
        </template>

        <template #actions>
          <button class="btn" type="button" @click="tryAgain">
            {{ resultPopupType === 'success' ? 'Скачать чек-лист' : 'Подумать еще' }}
          </button>
        </template>
      </popup-result>
    </teleport>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import draggable from 'vuedraggable';
import PopupResult from './PopupResult.vue';

import { phraseDeclension } from '@/plugins/formatting';

export default {
  props: {
    facts: {
      required: true,
      type: Object,
    },
  },
  components: {
    draggable,
    PopupResult,
  },
  mounted() {
    this.facts.answers.forEach((answer, idx) => {
      this.currentAnswers.push(answer);
      this.currentFacts[`facts_${idx}`] = [];
    });
    this.allFacts = this.facts.allFacts;
  },
  data() {
    return {
      currentAnswers: [],
      currentFacts: {},
      allFacts: [],
      isGhost: false,
      errors: 0,
      errorWordVariants: ['ошибка', 'ошибок', 'ошибки'],
      isOpenPopupResult: false,
      isFirstShow: true,
    };
  },
  methods: {
    ...mapActions('auth', [
      'updatePoints',
    ]),
    setActiveClass(i) {
      const currentElement = document.querySelector(`li[data-key="${i}"]`);
      currentElement.classList.add('show');
      this.isFirstShow = false;
    },
    removeActiveClass(i) {
      const currentElement = document.querySelector(`li[data-key="${i}"]`);
      currentElement.classList.remove('show');
    },
    changeFacts() {
      this.allFacts = this.allFacts.map((fact) => ({
        ...fact,
        isShow: false,
      }));
      if (this.allFacts.length !== this.distributedPhrasesCount) {
        this.allFacts[this.distributedPhrasesCount].isShow = true;
      }
    },
    checkFacts() {
      this.errors = 0;
      const factsKeys = Object.keys(this.currentFacts);

      this.currentAnswers.forEach((answer, i) => {
        const currentKey = Object.keys(this.currentFacts)[i];
        this.currentFacts[currentKey] = this.currentFacts[currentKey].map((el) => {
          const isSomeEqualName = answer.some((item) => item.name === el.name);
          return {
            ...el,
            isTrue: isSomeEqualName,
          };
        });
      });

      factsKeys.forEach((key) => {
        const errorFacts = this.currentFacts[key].filter((fact) => !fact.isTrue);
        this.errors += errorFacts.length;
      });

      if (this.errors === 0) {
        this.$api.user.addPoints({ taskId: 4 });
        this.updatePoints();
      } else {
        this.$api.user.addPoints({
          taskId: 4,
          isSuccess: false,
        });
      }

      this.isOpenPopupResult = true;
    },
    tryAgain() {
      this.errors = 0;
      this.isOpenPopupResult = false;
    },
  },
  computed: {
    isActiveFact() {
      return this.allFacts.filter((fact) => fact.isShow);
    },

    distributedPhrasesCount() {
      let factsResult = 0;
      const factsKeys = Object.keys(this.currentFacts);
      factsKeys.forEach((key) => {
        factsResult += this.currentFacts[key].length;
      });
      return factsResult;
    },

    resultPopupType() {
      if (this.errors !== 0 || !this.allFacts) {
        return 'error';
      }

      if (this.errors === 0 || this.allFacts) {
        return 'success';
      }

      return 'default';
    },

    resultPopupTitle() {
      if (this.resultPopupType === 'success') {
        return `Ни единой ошибки!<br>
                Не зря ты начальник цеха.`;
      } if (this.resultPopupType === 'error') {
        return 'Упс!';
      }

      return 'Неплохо, неплохо!';
    },

    resultPopupDescription() {
      if (this.resultPopupType === 'success') {
        return `Если хочешь знать о работе компании
                ещё больше, смотри это видео.`;
      } if (this.resultPopupType === 'error') {
        const errorsCount = phraseDeclension(this.errors, this.errorWordVariants);

        return `Здесь есть ${errorsCount}.
                Попробуй еще раз.`;
      }

      return `Но, как гласит концепция бережливого
              производства, нужно постоянно совершенствоваться.
              Так что лови чек-лист с soft skills — ими должен
              обладать каждый сотрудник промышленности 2.0!`;
    },
  },
};
</script>

<style scoped>
  .museum__title {
    width: 100%;
    margin-bottom: 35px;
  }

  .museum__subtitle {
    margin-bottom: 55px;
  }

  .museum__facts-images {
    display: flex;
    list-style: none;
    justify-content: space-between;
  }

  .museum__facts-images li {
    width: 289px;
    position: relative;
  }

  .museum__facts-link {
    color: #000000;
    font-size: 10px;
    display: block;
    text-align: center;
    margin-top: 12px;
    font-weight: 700;
  }

  .museum__facts-descr {
    position: absolute;
    top: 0;
    background: #ffffff;
    color: var(--basic-text-color);
    height: 219px;
    font-size: 15px;
    opacity: 0;
    transition: 0.3s;
  }

  li.show > .museum__facts-descr {
    opacity: 1;
  }

  .museum__facts-images img {
    width: 100%;
    height: 219px;
    object-fit: cover;
    border-radius: 20px;
  }

  .museum__distributed-facts {
    list-style: none;
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    margin-bottom: 65px;
  }

  .museum__distributed-facts li {
    height: 379px;
    width: 289px;
    background: url("../assets/img/museum/facts-bg.svg") no-repeat center;
    background-size: contain;
  }

  .museum__current-facts {
    margin-top: 50px;
  }

  .museum__all-facts .list-group {
    width: 289px;
    height: 64px;
    margin: 0 auto;
    text-align: center;
    font-family: Roboto;
    font-size: 11px;
    font-weight: 900;
    border: 2px solid var(--basic-bg-color);
    border-radius: 30px;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0 22px;
    position: relative;
    background: var(--basic-white-color);
    color: var(--basic-text-color);
  }

  .museum__all-facts .custom-ghost {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 22px;
    background: var(--basic-white-color);
    border-radius: 30px;
  }

  .museum__all-facts .list-group:before,
  .museum__all-facts .list-group:after {
    content: '';
    background: var(--basic-white-color);
    border: 2px solid var(--basic-bg-color);
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    border-radius: 30px;
    left: -5px;
    top: 2px;
  }

  .museum__all-facts .list-group:after {
    left: 1px;
    top: 5px;
    z-index: -2;
  }

  .museum__images {
    position: absolute;
    width: 100%;
  }

  .museum__group {
    width: 269px;
    height: 64px;
    margin: 0 auto;
  }

  .museum__group img:first-child {
    margin-left: -35px;
    margin-top: -10px;
  }

  .museum__group img:last-child {
    margin-left: 260px;
    margin-top: -30px;
  }

  .museum__distributed-facts .list-group__item,
  .museum__distributed-facts .custom-ghost {
    padding: 0 40px;
    text-align: center;
    height: 64px;
    display: flex;
    align-items: center;
    margin-bottom: 14px;
    font-size: 11px;
    font-weight: 900;
    font-family: 'Roboto';
    color: var(--basic-text-color);
    cursor: pointer;
  }

  .museum__distributed-facts .list-group {
    height: 100%;
  }

  .museum__distributed-facts .ghost {
    opacity: 0.8;
  }

  .museum__all-facts {
    position: relative;
  }

  .museum__cloud {
    position: absolute;
    left: 17%;
    top: -45px;
    color: var(--default-text-color);
  }

  .museum__cloud span {
    font-weight: 900;
    text-align: center;
    display: inline-block;
    background: url('../assets/img/museum/cloud-info.svg') no-repeat;
    background-size: contain;
    padding: 22px 18px;
    font-size: 11px;
  }

  .museum__facts-title {
    color: var(--basic-text-color);
    text-align: center;
    font-size: 18px;
    font-weight: 900;
  }

  .museum__facts-subtitle {
    color: var(--basic-text-color);
    font-size: 10px;
    text-align: center;
  }

  .museum__instruction {
    position: absolute;
    right: 0;
    bottom: -30px;
  }
</style>
