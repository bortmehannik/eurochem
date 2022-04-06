<template>
  <div class="task">
    <button
      class="task__activator"
      :class="{
        'task__activator--success': task.success
      }"
      type="button"
      @click="openPopup"
    >
      {{ task.buttonTitle }}
      <!-- <img
        v-if="!disabled"
        :src="info.success ? info.imageSuccess : info.image"
        alt=""
      /> -->
    </button>

    <teleport to="body">
      <popup v-model="isPopupOpen">
        <stepper v-model="step">
          <stepper-content :step="1">
            <h2>Шаг 1</h2>
            {{ task.buttonTitle }}
          </stepper-content>

          <stepper-content :step="2">
            <h2>Шаг 2</h2>
            {{ task.buttonTitle }}
          </stepper-content>
        </stepper>
      </popup>
    </teleport>
  </div>
</template>

<script>
import Popup from '@/components/Popup.vue';
import Stepper from '@/components/Stepper.vue';
import StepperContent from '@/components/StepperContent.vue';

export default {
  name: 'Task',

  components: {
    Popup,
    Stepper,
    StepperContent,
  },

  props: {
    task: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      isPopupOpen: false,
      step: 1,
    };
  },

  methods: {
    openPopup() {
      this.isPopupOpen = true;
    },
  },
};
</script>
