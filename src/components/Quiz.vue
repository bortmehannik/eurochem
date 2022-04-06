<template>
  <div class="quiz">
    <form
      class="quiz__form"
      method="POST"
      @submit.prevent="onEndQuiz"
    >
      <stepper
        v-model="step"
        quiz-mode
      >
        <stepper-content
          class="quiz__step"
          v-for="(question, questionIdx) in questions"
          :step="questionIdx + 1"
          :key="`qst-${questionIdx}`"
        >
          <div class="quiz__info">
            <p v-if="question.begin" class="quiz__begin" v-html="question.begin" />

            <p v-if="question.title && question.title.length > 0" class="quiz__title">
              <b>{{ question.title }}</b>
            </p>

            <picture v-if="question.image && question.image.length > 0">
              <img
                class="quiz__image"
                :src="require(`@/assets/images/quiz/${question.image}`)"
                width="384"
                height="223"
              />
            </picture>
          </div>

          <ul class="quiz__answers">
            <li
              v-for="(answer, answerIdx) in question.answers"
              class="quiz__answer"
              :key="`answ-${answerIdx}`"
            >
              <input
                :id="`answ-${questionIdx}-${answerIdx}`"
                class="quiz__radio"
                type="radio"
                v-model="answers[questionIdx]"
                :name="`qst-${questionIdx}`"
                :value="answerIdx"
              >

              <label
                class="quiz__label"
                :for="`answ-${questionIdx}-${answerIdx}`"
                v-html="answer.value"
              />
            </li>
          </ul>
        </stepper-content>
      </stepper>

      <button class="btn quiz__end" type="submit">
        Отправить ответы
      </button>
    </form>

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
          <button class="btn quiz__action-btn" type="button" @click="tryAgain">
            Пройти заново
          </button>

          <a class="btn quiz__action-btn" href="/checklist-quiz.pdf" download>
            Скачать чек-лист
          </a>
        </template>
      </popup-result>
    </teleport>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import Stepper from './Stepper.vue';
import StepperContent from './StepperContent.vue';
import PopupResult from './PopupResult.vue';

export default {
  name: 'Quiz',

  components: {
    Stepper,
    StepperContent,
    PopupResult,
  },

  props: {
    questions: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      step: 1,
      answers: [],
      totalPoints: 0,
      isOpenPopupResult: false,
      errorPoints: [],
      successPoints: [],
      maxPoints: 0,
    };
  },

  computed: {
    errorsCount() {
      return this.answers.reduce((resultErrors, answerIdx, idx) => {
        const currentQuestion = this.questions[idx];
        const errorAnswerIdx = currentQuestion.answers.findIndex((item) => item.points === 0);
        const isErrorAnswer = answerIdx === errorAnswerIdx;

        if (isErrorAnswer) {
          return resultErrors + 1;
        }

        return resultErrors;
      }, 0);
    },

    resultPopupType() {
      if (this.totalPoints >= this.successPoints[0] && this.totalPoints <= this.successPoints[1]) {
        return 'success';
      } if (this.totalPoints >= this.errorPoints[0] && this.totalPoints <= this.errorPoints[1]) {
        return 'error';
      }

      return 'default';
    },

    resultPopupTitle() {
      if (this.resultPopupType === 'success') {
        return 'Ты — будущее индустрии!';
      } if (this.resultPopupType === 'error') {
        return 'Ты еще совсем зеленый…';
      }

      return 'Неплохо, неплохо!';
    },

    resultPopupDescription() {
      if (this.resultPopupType === 'success') {
        return `У тебя развиты почти все профессиональные навыки, которыми должен обладать
                каждый сотрудник промышленности 2.0. Не веришь?
                Глянь в этот чек-лист и убедись!`;
      } if (this.resultPopupType === 'error') {
        return `Зато сколько нового и интересного ждет впереди!
                Скорее беги за чек-листом и смотри, какими профессиональными навыками  должен
                обладать каждый сотрудник промышленности 2.0.`;
      }

      return `Но, как гласит концепция бережливого
              производства, нужно постоянно совершенствоваться.
              Так что лови чек-лист с профессиональными навыками — ими должен
              обладать каждый сотрудник промышленности 2.0!`;
    },
  },

  created() {
    this.resetAnswers();

    this.maxPoints = this.questions.reduce((resultPoints, question) => {
      const answersPoints = question.answers.map((item) => item.points);
      const maxPoints = Math.max.apply(null, answersPoints);

      return resultPoints + maxPoints;
    }, 0);

    const maxErrorPoints = this.maxPoints / 3 - 1;
    this.errorPoints = [0, maxErrorPoints];

    const minSuccessPoints = this.maxPoints - this.maxPoints / 6;
    this.successPoints = [minSuccessPoints, this.maxPoints];
  },

  methods: {
    ...mapActions('auth', [
      'updatePoints',
    ]),

    resetAnswers() {
      this.answers = new Array(this.questions.length);
      this.answers.fill(0);
    },

    onEndQuiz() {
      this.isOpenPopupResult = true;

      this.calculateResult();
    },

    calculateResult() {
      this.totalPoints = this.answers.reduce((resultPoints, answerIdx, idx) => {
        const currentQuestion = this.questions[idx];
        const answer = currentQuestion.answers[answerIdx];

        return resultPoints + answer.points;
      }, 0);

      if (this.resultPopupType === 'success') {
        this.$api.user.addPoints({ taskId: 6 });
        this.updatePoints();
      }
    },

    tryAgain() {
      this.resetAnswers();
      this.step = 1;
      this.isOpenPopupResult = false;
    },
  },
};
</script>

<style scoped>
.quiz {
  background-color: var(--accent-secondary-color);
  border: 1px solid var(--basic-text-color);
  border-radius: 40px;
  padding: 45px 80px 130px;
}

.quiz__step {
  display: flex;
}

.quiz__info {
  padding-top: 42px;
  margin-right: 20px;
}

.quiz__begin,
.quiz__title {
  font-size: 20px;
  line-height: 24px;
  color: var(--accent-text-color);
  margin: 0;
  margin-bottom: 10px;
}

.quiz__answers {
  list-style: none;
  padding: 0;
  margin: 0;
}

.quiz__answer:not(:last-child) {
  margin-bottom: 32px;
}

.quiz__label {
  position: relative;
  display: inline-block;
  width: 364px;
  font-size: 15px;
  text-align: center;
  color: var(--basic-white-color);
  background-color: var(--accent-text-color);
  border: 1px solid var(--basic-text-color);
  box-sizing: border-box;
  border-radius: 73px;
  padding: 37px 32px;
  transition: all .3s ease-in-out;
  cursor: pointer;
}

.quiz__label::after {
  content: '';
  position: absolute;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.quiz__answer:first-child .quiz__label::after {
  width: 76px;
  height: 55px;
  left: -20px;
  bottom: -6px;
  background-image: url(~@/assets/icons/drill.svg);
}

.quiz__answer:nth-child(2) .quiz__label::after {
  width: 85px;
  height: 85px;
  left: 50%;
  bottom: 0;
  background-image: url(~@/assets/icons/shovel.svg);
  transform: translate(-50%, 50%);
}

.quiz__answer:last-child .quiz__label::after {
  width: 90px;
  height: 90px;
  right: -10px;
  background-image: url(~@/assets/icons/pickaxe.svg);
}

.quiz__radio {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  border: 0;
  clip: rect(0,0,0,0);
  clip-path: inset(100%);
}

.quiz__radio:checked + .quiz__label {
  color: var(--accent-text-color);
  background-color: var(--basic-white-color);
}

.quiz__image {
  width: 384px;
  height: 223px;
  object-fit: cover;
  border-radius: 10px;
  overflow: hidden;
}

.quiz__action-btn:not(:last-child) {
  margin-bottom: 15px;
}

.quiz__end {
  margin-top: 42px;
}
</style>
