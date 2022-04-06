<template>
  <div class="stepper">
    <ul
      v-if="quizMode && maxStep > 1"
      class="stepper__quiz-links"
    >
      <li
        v-for="number in maxStep"
        class="stepper__quiz-link-item"
        :key="number"
      >
        <input
          :id="`link-${number}`"
          class="stepper__quiz-link"
          type="radio"
          name="stepper-links"
          :value="number"
          :checked="modelValue === number"
          @change="changeStep(number)"
        >

        <label
          class="stepper__quiz-link-label"
          :for="`link-${number}`"
        >
          <span class="visually-hidden">Вопрос {{ number }}</span>
        </label>
      </li>
    </ul>

    <slot />
  </div>
</template>

<script>
export default {
  name: 'Stepper',

  props: {
    modelValue: {
      type: Number,
      required: true,
    },

    quizMode: {
      type: Boolean,
      default: false,
    },

    hideSteps: {
      type: Boolean,
      default: false,
    },
  },

  emits: {
    'update:modelValue': null,
    'end-quiz': null,
  },

  computed: {
    maxStep() {
      let children = this.$slots.default();

      const isChildrenNotStepperContent = children.length === 1 && children[0].type.name !== 'StepperContent';
      const isChildrenManyElements = children[0].children.length > 0;

      if (isChildrenNotStepperContent && isChildrenManyElements) {
        children = children[0].children;
      }

      const stepperContentItems = children.filter((stepperItem) => stepperItem.type.name === 'StepperContent');

      return stepperContentItems.length;
    },
  },

  methods: {
    changeStep(newStep) {
      this.$emit('update:modelValue', newStep);
    },

    nextStep() {
      if (this.modelValue < this.maxStep) {
        this.changeStep(this.modelValue + 1);
      }
    },
  },
};
</script>

<style scoped>
.stepper__quiz-links {
  position: absolute;
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.stepper__quiz-link-item:not(:last-child) {
  margin-right: 14px;
}

.stepper__quiz-link {
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

.stepper__quiz-link-label {
  position: relative;
  display: inline-block;
  width: 17px;
  height: 17px;
  cursor: pointer;
}

.stepper__quiz-link-label::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid var(--accent-text-color);
  box-sizing: border-box;
  transition: background-color .3s ease-in-out;
}

.stepper__quiz-link:checked + .stepper__quiz-link-label::before {
  background-color: var(--accent-text-color);
}

.quiz .visually-hidden {
  display: none;
}
</style>
