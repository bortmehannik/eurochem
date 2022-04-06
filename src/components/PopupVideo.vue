<template>
  <popup
    :modelValue="modelValue"
    class="popup-video"
    @close="onClose"
  >
    <popup-main>
      <template #title>
        <slot name="title" />
      </template>

      <template #description>
        <slot name="description" />
      </template>

      <div class="popup-video__video-wrapper">
        <div class="popup-video__video-inner-wrapper">
          <iframe
            class="popup-video__video"
            :src="link"
            frameborder="0"
            width="100%"
            height="440"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </popup-main>
  </popup>
</template>

<script>
import Popup from './Popup.vue';
import PopupMain from './PopupMain.vue';

export default {
  name: 'PopupVideo',

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

    link: {
      type: String,
      required: true,
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
.popup-video {
  background: var(--accent-gradient);
}

.popup-video__video-wrapper,
.popup-video__video-inner-wrapper {
  position: relative;
}

.popup-video__video {
  width: 100%;
  height: 440px;
  border-radius: 12px;
}

.popup-video__video-inner-wrapper::before,
.popup-video__video-inner-wrapper::after,
.popup-video__video-wrapper::after {
  content: '';
  position: absolute;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.popup-video__video-wrapper::after {
  width: 172px;
  height: 148px;
  left: -32px;
  bottom: -42px;
  background-image: url(~@/assets/icons/video-escort.svg);
}

.popup-video__video-inner-wrapper::before {
  width: 190px;
  height: 350px;
  top: -285px;
  right: 20px;
  background-image: url(~@/assets/icons/video-stairs-1.svg);
  z-index: -1;
}

.popup-video__video-inner-wrapper::after {
  width: 190px;
  height: 350px;
  bottom: -280px;
  right: 320px;
  background-image: url(~@/assets/icons/video-stairs-2.svg);
  z-index: -1;
}
</style>
