<template>
  <section
    v-if="modelValue"
    class="popup"
    :class="{
      'popup--accent': type == 'accent',
      'popup--secondary': isSecondary
    }"
    @click="close"
  >
    <div class="popup__inner-wrapper">
      <div class="container">
        <div class="popup__content" @click.stop>
          <button class="popup__close" @click="close">
            <span class="visually-hidden">на карту</span>
          </button>

          <slot />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { mapGetters } from 'vuex';

export default {
  name: 'Popup',

  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },

    type: {
      type: String,
      default: 'default',
    },

    firstStepBgColor: {
      type: String,
      default: '',
    },
  },

  emits: {
    'update:modelValue': null,
    close: null,
  },

  computed: {
    isSecondary() {
      const defaultSlot = this.$slots.default();
      return this.firstStepBgColor === 'secondary' && defaultSlot[0]?.props?.modelValue === 1;
    },
    ...mapGetters('auth', [
      'getUser',
    ]),
  },

  mounted() {
    // TODO: есть проблема когда мы хотим скрыть попап над
    // другим попапом. В таком случае скрываются оба
    document.addEventListener('keydown', this.handleKeydown);
  },

  updated() {
    if (this.modelValue) {
      disableBodyScroll(this.$el);
    } else {
      enableBodyScroll(this.$el);
    }
  },

  beforeUnmount() {
    clearAllBodyScrollLocks();
    document.removeEventListener('keydown', this.handleKeydown);
  },

  methods: {
    handleKeydown(evt) {
      if (this.modelValue && evt.key === 'Escape') {
        this.close();
      }
    },

    close() {
      this.$emit('update:modelValue', false);
      this.$emit('close');

      window.scrollTo(0, 0);
    },
  },
};
</script>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
  background-color: var(--popup-bg-color);
  overflow-y: scroll;
}

.popup--accent {
  background-color: var(--popup-accent-bg-color);
}

.popup--secondary {
  background-color: var(--accent-secondary-color);
}

.popup__inner-wrapper {
  position: relative;
  min-height: 100%;
  overflow: hidden;
}

.popup__inner-wrapper::before,
.popup__inner-wrapper::after {
  content: '';
  position: absolute;
  z-index: -1;
}

.popup__inner-wrapper::after {
  z-index: -2;
}

.popup__close {
  position: absolute;
  top: 20px;
  right: 20px;
  font-weight: 900;
  height: 20px;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  z-index: 9;
  color: var(--basic-text-color);
  background: #A9D5F3;
  border-radius: 13px;
  font-weight: 400;
  padding: 0 10px 0 30px;
  height: 24px;
}

.popup__close:before {
  content: '';
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-right: 11px solid var(--popup-accent-bg-color);
  border-bottom: 6px solid transparent;
  position: absolute;
  left: 10px;
  top: 6px;
}

.popup--secondary .popup__close {
  background: #003D64;
  color: #ffffff;
}

.popup--secondary .popup__close:before {
  border-right-color: #ffffff;
}

.popup__content {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  color: var(--basic-white-color);
  background-color: transparent;
  box-sizing: border-box;
  z-index: 9;
}
</style>
