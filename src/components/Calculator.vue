<template>
  <div class="calculator">
    <div class="container">
      <div class="calculator__group">
        <div class="calculator__left-content">
          <div class="calculator__switcher">
            <img
              v-if="currentStep === 5"
              class="calculator__step" src="../assets/img/calculator/current-step.svg"
              alt=""
            >
            <div class="calculator__buttons">
              <ul>
                <li v-for="step in reverseCalculatorArray" :key="step.id">
                  <button
                    class="calculator__btn"
                    :class="{ active: step.id === currentStep }"
                    @click="currentStep = step.id"
                  >
                    <span class="number">{{ step.id }}</span>
                    <span class="title">{{ step.position }}</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div class="calculator__avatar">
            <img :src="require(`@/assets/img/calculator/${steps[currentStep - 1].image}`)" alt="">
          </div>
        </div>
        <div class="calculator__content">
          <div class="calculator__left">
            <div class="calculator__cash-info">
              <div class="calculator__static long">
                <p>Что сможешь позволить</p>
              </div>
              <div class="calculator__dynamic">
                <p>Зарплата <b>{{ steps[currentStep - 1].price }} тыс. ₽</b></p>
              </div>
            </div>
            <p class="calculator__text" v-html="steps[currentStep - 1].text"></p>
            <div class="calculator__static">
              <p>Что даст компания</p>
            </div>
            <ul class="calculator__list full">
              <li v-for="(advanture, i) in steps[currentStep - 1].advantages" :key="i">
                {{ advanture }}
              </li>
            </ul>
          </div>
          <div class="calculator__right">
            <div class="calculator__static">
              <p>Как вырасти</p>
            </div>
            <ul class="calculator__list">
              <li v-for="(el, i) in steps[currentStep - 1].up" :key="i">
                <span v-html="el"></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import stepsJSON from '@/static/calculator.json';

export default {
  data() {
    return {
      steps: stepsJSON,
      currentStep: 1,
    };
  },
  computed: {
    reverseCalculatorArray() {
      return this.steps.slice().reverse();
    },
  },
};
</script>

<style scoped>
  .calculator {
    padding: 50px 0;
  }

  .calculator__step {
    position: absolute;
    top: 110px;
    left: -120px;
  }

  .calculator__group {
    display: flex;
  }

  .calculator__left-content {
    display: flex;
    align-items: flex-end;
    width: 40%;
  }

  .calculator__buttons ul {
    list-style: none;
  }

  .calculator__btn {
    background: transparent;
    border: none;
    margin-top: 30px;
    position: relative;
    cursor: pointer;
    display: flex;
  }

  .calculator__btn.active .number {
    background-color: var(--accent-color);
    font-weight: bold;
    border-width: 2px;
  }

  .calculator__btn.active .title {
    font-size: 17px;
    line-height: 19px;
    font-weight: bold;
  }

  .calculator__btn:before {
    content: '';
    width: 2px;
    height: 16px;
    background: var(--calculator-buttons-border);
    position: absolute;
    border-radius: 7px;
    top: -23px;
    left: 10px;
  }

  .calculator__buttons li:first-child .calculator__btn {
    margin-top: 0;
  }

  .calculator__buttons li:first-child .calculator__btn:before {
    content: none;
  }

  .calculator__btn .number {
    width: 23px;
    height: 23px;
    font-size: 13px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: var(--calculator-buttons-color);
    border-radius: 100%;
    border: 1px solid var(--calculator-buttons-border);
    color: var(--calculator-buttons-border);
  }

  .calculator__btn .title {
    color: var(--calculator-buttons-border);
    font-size: 11px;
    line-height: 13px;
    width: 133px;
    display: inline-block;
    text-align: left;
    left: 25px;
    position: absolute;
    margin-left: 25px;
  }

  .calculator__static {
    background: var(--calculator-accent-color);
    color: #ffffff;
    font-size: 13px;
    line-height: 16px;
    font-weight: bold;
    padding: 5px 13px;
    border-radius: 22px;
    display: inline-block;
  }

  .calculator__static.long {
    padding-right: 60px;
  }

  .calculator__dynamic {
    border: 1px solid var(--calculator-buttons-border);
    padding: 4px 13px;
    border-radius: 22px;
    font-size: 13px;
    line-height: 16px;
    margin-left: -40px;
    background: #ffffff;
    color: var(--calculator-accent-color);
  }

  .calculator__cash-info {
    display: flex;
  }

  .calculator__content {
    display: flex;
    align-items: flex-start;
    width: 60%;
    min-height: 395px;
  }

  .calculator__list {
      list-style: none;
      padding-left: 15px;
  }

  .calculator__list.full {
    width: 100%;
  }

  .calculator__list li {
    margin-top: 32px;
    color: var(--calculator-accent-color);
    position: relative;
    font-size: 13px;
  }

  .calculator__list .success-color {
    font-weight: bold;
  }

  .calculator__list li:before {
    content: '';
    width: 8px;
    height: 8px;
    background: var(--calculator-buttons-border);
    position: absolute;
    border-radius: 100px;
    left: -15px;
    top: 2px;
  }

  .calculator__right {
    padding-left: 20px;
  }

  .calculator__text {
    margin-bottom: 63px;
    margin-top: 19px;
    color: var(--calculator-accent-color);
    font-size: 13px;
    line-height: 16px;
  }

  .calculator__left {
    width: 65%;
  }

  .calculator__right {
    width: 35%;
  }

  .calculator__switcher {
    width: 45%;
    height: 100%;
    display: flex;
    align-items: flex-end;
  }

  .calculator__avatar {
    width: 55%;
  }
</style>
