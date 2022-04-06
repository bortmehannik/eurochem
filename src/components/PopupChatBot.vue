<template>
  <popup
    :modelValue="modelValue"
    class="popup-chat-bot"
    @close="onClose"
  >
    <popup-main>
      <template #title>
        <slot name="title" />
      </template>

      <template #description>
        <slot name="description" />
      </template>
    </popup-main>
    <img
      class="popup-chat-bot__choose-partner"
      :src="require('@/assets/images/choose-partner.svg')" alt="">
    <ul class="popup-chat-bot__choice-list">
      <li
        v-for="(companion, companionIdx) in companions"
        :key="companionIdx"
        class="popup-chat-bot__choice"
      >
        <button
          class="popup-chat-bot__select-companion"
          :class="{
            'popup-chat-bot__select-companion--masha': companion.name === 'Мария Сергеевна',
            'popup-chat-bot__select-companion--petya': companion.name === 'Петр Александрович',
            'popup-chat-bot__select-companion--vasya': companion.name === 'Василий Иванович',
          }"
          type="button"
          @click="selectCompanion(companionIdx)"
        >
          <span class="popup-chat-bot__companion-name">
            {{ companion.name }}
          </span>
          <br>
          <span class="popup-chat-bot__companion-position">
            {{ companion.position }}
          </span>
        </button>
      </li>
    </ul>

    <popup
      class="popup-chat-bot__inner-popup"
      v-model="isInnerPopupVisible"
      type="accent"
      @close="onClose"
    >
      <chat-bot
        :start-messages="startMessages"
        :messages="messages"
        :companion="selectedCompanion"
      />
    </popup>
  </popup>
</template>

<script>
import Popup from './Popup.vue';
import PopupMain from './PopupMain.vue';
import ChatBot from './ChatBot.vue';

export default {
  name: 'PopupChatBot',

  components: {
    Popup,
    PopupMain,
    ChatBot,
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

    companions: {
      type: Array,
      required: true,
    },

    startMessages: {
      type: Map,
      required: true,
    },

    messages: {
      type: Map,
      required: true,
    },
  },

  data() {
    return {
      isInnerPopupVisible: false,
      selectedCompanion: null,
    };
  },

  methods: {
    onClose() {
      this.$emit('update:modelValue', false);
      this.$emit('close');
    },

    selectCompanion(companionIdx) {
      this.selectedCompanion = this.companions[companionIdx];

      this.isInnerPopupVisible = true;
    },
  },
};
</script>

<style scoped>
.popup-chat-bot__choice-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.popup-chat-bot__choose-partner {
  position: absolute;
  top: 300px;
}

.popup-chat-bot__choice {
  width: 240px;
  margin-left: 45px;
  margin-right: 45px;
}

.popup-chat-bot__select-companion {
  position: relative;
  width: 100%;
  text-align: center;
  background: none;
  padding-top: 208px;
  border: 0;
  cursor: pointer;
}

.popup-chat-bot__select-companion::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 196px;
  height: 188px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  transform: translateX(-50%);
}

.popup-chat-bot__select-companion--masha::before {
  background-image: url(~@/assets/icons/masha.svg);
}

.popup-chat-bot__select-companion--petya::before {
  background-image: url(~@/assets/icons/petya.svg);
}

.popup-chat-bot__select-companion--vasya::before {
  background-image: url(~@/assets/icons/vasya.svg);
}

.popup-chat-bot__companion-name {
  font-weight: 900;
  font-size: 30px;
  line-height: 37px;
  color: var(--accent-color);
  margin-bottom: 5px;
}

.popup-chat-bot__companion-position {
  font-size: 18px;
  line-height: 22px;
  color: var(--accent-text-color);
}
</style>
