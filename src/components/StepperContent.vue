<template>
  <div v-show="isCurrentStep" class="stepper__content">
    <slot />

    <ul
      v-if="maxStep > 1 && !isHideSteps"
      class="stepper__links"
      :class="{
        'stepper__links--quiz': isQuizMode
      }"
    >
      <li class="stepper__link-item" v-if="isPrevBtn">
        <button
          class="btn stepper__button stepper__button--prev"
          type="button"
          :disabled="isFirstStep"
          @click="prev"
        >
          {{ prevBtnName }}
        </button>
      </li>

      <li class="stepper__link-item" v-if="isNextBtn">
        <button
          class="btn stepper__button stepper__button--next"
          :class="{'btn--black': isPrevBtn}"
          type="button"
          :disabled="isLastStep"
          @click="next"
        >
          {{ nextBtnName }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'StepperContent',

  props: {
    step: {
      type: Number,
      required: true,
    },
    nextBtnName: {
      type: String,
      default: 'Далее',
    },
    prevBtnName: {
      type: String,
      default: 'Назад',
    },
    isNextBtn: {
      type: Boolean,
      default: true,
    },
    isPrevBtn: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    isQuizMode() {
      return this.$parent.quizMode;
    },

    isHideSteps() {
      return this.$parent.hideSteps;
    },

    isCurrentStep() {
      return this.$parent.modelValue === this.step;
    },

    maxStep() {
      let parentChildren = this.$parent.$slots.default();

      const isParentChildrenNotStepperContent = parentChildren.length === 1 && parentChildren[0].type.name !== 'StepperContent';
      const isParentChildrenManyElements = parentChildren[0].children.length > 0;

      if (isParentChildrenNotStepperContent && isParentChildrenManyElements) {
        parentChildren = parentChildren[0].children;
      }

      const stepperContentItems = parentChildren.filter((stepperItem) => stepperItem.type.name === 'StepperContent');

      return stepperContentItems.length;
    },

    isFirstStep() {
      return this.$parent.modelValue === 1;
    },

    isLastStep() {
      return this.$parent.modelValue === this.maxStep;
    },
  },

  methods: {
    prev() {
      if (!this.isFirstStep) {
        const prevStep = this.$parent.modelValue - 1;
        this.$parent.$emit('update:modelValue', prevStep);
      }
    },

    next() {
      if (!this.isLastStep) {
        const nextStep = this.$parent.modelValue + 1;

        this.$parent.$emit('update:modelValue', nextStep);
      }
    },

    endQuiz() {
      this.$parent.$emit('end-quiz');
    },
  },
};
</script>

<style scoped>
.stepper__content {
  position: relative;
}

.stepper__links {
  display: flex;
  list-style: none;
  justify-content: center;
}

.stepper__links--quiz {
  position: absolute;
  top: calc(100% + 50px);
  left: 50%;
  transform: translateX(-50%);
}

.stepper__links--quiz .stepper__button {
  width: 30px;
  height: 30px;
  font-size: 0px;
  background-color: transparent;
  background-position: center;
  background-repeat: no-repeat;
  border: 2px solid var(--accent-text-color);
  border-radius: 50%;
  padding: 0;
}

.quiz .stepper__button--prev {
  background-image: url("data:image/svg+xml,%3Csvg width='10' height='17' viewBox='0 0 10 17' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.70117 16.0762L1.49669 8.87169L8.70117 1.6672' stroke='%23003D64' stroke-width='2'/%3E%3C/svg%3E%0A");
}

.quiz .stepper__button--next {
  background-image: url("data:image/svg+xml,%3Csvg width='10' height='17' viewBox='0 0 10 17' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.29883 0.924805L8.50331 8.12929L1.29883 15.3338' stroke='%23003D64' stroke-width='2'/%3E%3C/svg%3E%0A");
}

.quiz .stepper__links--quiz .stepper__link-item:first-child {
  margin-right: 5px;
}
</style>
