<template>
  <popup
    class="popup--result"
    :class="{
      'popup--result-default': type === 'default',
      'popup--result-error': type === 'error',
      'popup--result-success': type === 'success',
    }"
    :modelValue="modelValue"
    @close="onClose"
  >
    <popup-main>
      <template #title>
        <slot name="title" />
      </template>

      <template #description>
        <slot name="description" />
      </template>

      <template #actions>
        <slot name="actions" />
      </template>
    </popup-main>
  </popup>
</template>

<script>
import Popup from '@/components/Popup.vue';
import PopupMain from '@/components/PopupMain.vue';

export default {
  name: 'PopupResult',

  components: {
    Popup,
    PopupMain,
  },

  emits: {
    'update:modelValue': null,
    close: null,
  },

  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },

    type: {
      type: String,
      default: 'default',
    },
  },

  methods: {
    onClose() {
      this.$emit('update:modelValue', false);
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.popup--result::v-deep(.container) {
  max-width: none;
}

.popup--result::v-deep(.popup__main) {
  position: relative;
  padding-top: 107px;
  padding-bottom: 30px;
}

.popup--result::v-deep(.popup__main::after) {
  content: '';
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.popup--result::v-deep(.popup__title),
.popup--result::v-deep(.popup__description) {
  text-align: center;
}

.popup--result::v-deep(.popup__title) {
  margin-bottom: 10px;
}

.popup--result::v-deep(.popup__description) {
  margin: 0 auto 50px;
}

.popup--result-error,
.popup--result-error::v-deep(.popup__content) {
  background-color: var(--accent-text-color);
}

.popup--result-error::v-deep(.popup__title) {
  font-size: 42px;
  color: var(--basic-white-color);
}

.popup--result-error::v-deep(.popup__description) {
  color: var(--basic-white-color);
}

.popup--result-error::v-deep(.popup__main::after) {
  width: 235px;
  height: 98px;
  background-image: url(~@/assets/icons/tube-error.svg);
}

.popup--result-default,
.popup--result-default::v-deep(.popup__content) {
  background-color: var(--accent-secondary-color);
}

.popup--result-default::v-deep(.popup__main::after) {
  width: 57px;
  height: 74px;
  background-image: url(~@/assets/icons/tube-default.svg);
}

.popup--result-success {
  background: var(--accent-gradient);
}

.popup--result-success::v-deep(.popup__main::after) {
  width: 142px;
  height: 110px;
  background-image: url(~@/assets/icons/tube-success.svg);
}
</style>
