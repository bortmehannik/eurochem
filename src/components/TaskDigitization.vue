<template>
  <div class="digitization">
    <div class="content">
      <h2 class="h2 digitization__title">Смотрим в будущее</h2>
      <p class="text digitization__descr">
        Промышленность постоянно развивается, предприятие никогда
        не встанет — в этой сфере работает все больше роботов,
        а сложными бизнес-процессами руководят искусственные интеллекты.
        В ЕвроХим тоже есть инновационные направления, в которых
        можно себя попробовать. Как думаешь, что из этого уже
        внедрено и во всю <b class="success-color">действует</b>?
      </p>
      <div class="digitization__game">
        <p class="digitization__info">
          Перетащи сюда верные направления. Если хочешь
          вернуть фразу на место, сделай то же самое, но в обратную сторону.
          <svg width="26" height="18" viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23 3L13 13L3 3" stroke="#003D64" stroke-width="6"/>
          </svg>
        </p>
        <div class="digitization__group digitization__group--duo">
          <draggable
            class="list"
            :list="allFacts"
            group="facts"
            itemKey="name"
            ghost-class="custom-ghost"
            :move="checkMove"
            @start="isGhost = true"
            @end="isGhost = false"
          >
            <template #item="{ element }">
              <div class="list__item">{{ element.name }}</div>
            </template>
          </draggable>
        </div>
        <div class="digitization__group digitization__group--single">
          <div class="digitization__ghost-elements" :class="{'ghost': isGhost}">
            <div
              class="digitization__ghost-element"
              v-for="fact in fixTrueFactsCount"
              :key="fact">
            </div>
          </div>
          <draggable
            class="list"
            :list="rightFacts"
            group="facts"
            itemKey="name"
            @start="isGhost = true"
            @end="isGhost = false"
          >
            <template #item="{ element }">
              <div class="list__item">{{ element.name }}</div>
            </template>
          </draggable>
        </div>
      </div>

      <button
        class="btn digitization__btn"
        @click="checkResults"
        :disabled="canCheckResults"
      >
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
      </popup-result>
    </teleport>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import { mapActions } from 'vuex';
import PopupResult from './PopupResult.vue';

import { phraseDeclension } from '@/plugins/formatting';

export default {
  components: {
    draggable,
    PopupResult,
  },

  props: {
    allFacts: {
      required: true,
      type: Array,
    },
  },

  data() {
    return {
      rightFacts: [],
      fixTrueFactsCount: 0,
      isGhost: false,
      isOpenPopupResult: false,
      errorWordVariants: ['ошибка', 'ошибок', 'ошибки'],
      errors: 0,
      allAnswers: false,
    };
  },

  computed: {
    trueFactsCount() {
      return this.allFacts.filter((fact) => fact.isTrue).length;
    },

    canCheckResults() {
      return this.rightFacts.length !== this.fixTrueFactsCount;
    },

    resultPopupType() {
      if (this.errors !== 0 || !this.allAnswers) {
        return 'error';
      }

      if (this.errors === 0 || this.allAnswers) {
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
        return '';
      } if (this.resultPopupType === 'error') {
        const errorsCount = phraseDeclension(this.errors, this.errorWordVariants);

        return `Здесь есть ${errorsCount}.
                Попробуй еще раз.`;
      }

      return '';
    },
  },

  mounted() {
    this.fixTrueFactsCount = this.trueFactsCount;
  },

  methods: {
    ...mapActions('auth', [
      'updatePoints',
    ]),
    checkResults() {
      this.errors = this.rightFacts.filter((fact) => !fact.isTrue).length;
      this.allAnswers = this.allFacts.filter((fact) => fact.isTrue).length === 0;

      if (this.errors === 0) {
        this.$api.user.addPoints({ taskId: 3 });
        this.updatePoints();
      } else {
        this.$api.user.addPoints({
          taskId: 3,
          isSuccess: false,
        });
      }

      this.isOpenPopupResult = true;
    },

    checkMove() {
      return this.allFacts.length > 3;
    },

    tryAgain() {
      this.isOpenPopupResult = false;
    },
  },
};
</script>

<style scoped>
.digitization {
  padding: 50px 0;
}

.list {
  height: 100%;
  position: relative;
  z-index: 3;
}

.digitization__game {
  display: flex;
  position: relative;
  min-height: 556px;
}

.list__item {
  color: #ffffff;
  font-size: 11px;
  line-height: 14px;
  font-weight: bold;
  padding: 0 15px;
  border-radius: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  height: 64px;
}

.digitization__group {
  position: relative;
}

.digitization__group .list {
  display: grid;
  grid-column-gap: 20px;
  grid-row-gap: 18px;
}

.digitization__group--duo .list {
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
  height: 100%;
}

.digitization__group--duo .list:before {
  content: '';
  background: url('../assets/img/digitization/gear.svg') no-repeat;
  width: 75px;
  height: 75px;
  position: absolute;
  background-size: contain;
  top: -50px;
  right: 80px;
  z-index: -1;
}

.digitization__group--duo .list:after {
  content: '';
  background: url('../assets/img/digitization/drill.svg') no-repeat;
  width: 119px;
  height: 86px;
  position: absolute;
  background-size: contain;
  left: -60px;
  bottom: 145px;
}

.digitization__group--duo {
  width: 80%;
  padding-right: 10px;
  height: 556px;
}

.digitization__group--duo .list__item {
  background: var(--basic-text-color);
  width: 48%;
}

.digitization__group--single {
  width: 20%;
  padding-left: 10px;
  position: absolute;
  top: 0;
  right: 0;
  height: 556px;
}

.digitization__group--single .list {
  grid-template-columns: 1fr;
  display: flex;
  flex-direction: column;
}

.digitization__group--single .list__item {
  background: var(--accent-success-game-color);
  border: 2px solid var(--basic-bg-color);
}

.digitization__ghost-elements {
  position: absolute;
  width: calc(100% - 10px);
}

.digitization__ghost-element {
  height: 64px;
  background: var(--accent-success-game-color);
  border-radius: 42px;
  border: 2px solid var(--basic-bg-color);
}

.digitization__ghost-element:not(:last-child) {
  margin-bottom: 18px;
}

.ghost .digitization__ghost-element {
  opacity: 0.5;
}

.digitization__descr {
  width: 65%;
  margin-top: 45px;
  margin-bottom: 40px;
}

.digitization__btn {
  width: 192px;
}

.digitization__info {
  position: absolute;
  top: -200px;
  right: 0;
  width: 21%;
  text-align: center;
  color: var(--basic-text-color);
}

.digitization__info svg {
  margin-top: 45px;
  position: absolute;
  right: 50%;
  transform: translateX(50%);
}
</style>
