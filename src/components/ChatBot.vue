<template>
  <div
    class="chat-bot"
    :class="{
      'chat-bot--masha': companion.name === 'Мария',
      'chat-bot--petya': companion.name === 'Петр',
      'chat-bot--vasya': companion.name === 'Василий Иванович',
    }"
  >
    <transition-group
      name="fade"
      tag="ol"
      class="chat-bot__messages"
    >
      <li
        v-for="(message, messageIdx) in chatSequence"
        class="chat-bot__message"
        :class="{
          'chat-bot__message--question': message.type == 'question',
          'chat-bot__message--answer': message.type == 'answer',
        }"
        :ref="`msg-${messageIdx}`"
        :key="`msg-${messageIdx}`"
      >
        <div class="chat-bot__message-wrapper" v-html="message.value" />
      </li>
    </transition-group>

    <div class="chat-bot__questions-wrapper">
      <template v-if="isStart">
        <p class="chat-bot__start-lead">
          Начни разговор
        </p>

        <transition-group
          v-if="startQuestions"
          name="list"
          tag="ul"
          class="chat-bot__questions"
        >
          <li
            v-for="(question, questionIdx) in startQuestions"
            :key="question"
            class="chat-bot__question"
          >
            <button
              class="chat-bot__ask-question"
              type="button"
              @click="askStartQuestion(questionIdx)"
            >
              {{ question }}
            </button>
          </li>
        </transition-group>
      </template>

      <transition-group
        v-else-if="questions && questions.length"
        name="list"
        tag="ul"
        class="chat-bot__questions"
      >
        <li
          v-for="(question, questionIdx) in questions"
          :key="question"
          class="chat-bot__question"
        >
          <button
            class="chat-bot__ask-question"
            type="button"
            @click="askQuestion(questionIdx)"
            :disabled="isLoading"
          >
            {{ question }}
          </button>
        </li>
      </transition-group>

      <p
        v-else
        class="chat-bot__end-questions"
      >
        Вопросы закончились
      </p>
    </div>
  </div>
</template>

<script>
import smoothscroll from 'smoothscroll-polyfill';

import { mapActions } from 'vuex';

export default {
  name: 'ChatBot',

  props: {
    companion: {
      type: Object,
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

    messageDelay: {
      type: Number,
      default: 1000,
    },
  },

  data() {
    return {
      isStart: true,
      isLoading: false,
      startQuestions: Array.from(this.startMessages.keys()),
      questions: Array.from(this.messages.keys()),
      chatSequence: [],
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    };
  },

  computed: {
    isEnd() {
      return this.questions.length === 0;
    },
  },

  created() {
    smoothscroll.polyfill();
  },

  watch: {
    isEnd(newValue) {
      if (newValue) {
        this.$api.user.addPoints({ taskId: 5 });
        this.updatePoints();
      }
    },
  },

  methods: {
    ...mapActions('auth', [
      'updatePoints',
    ]),

    askStartQuestion(questionIdx) {
      this.isStart = false;

      const questionText = this.startQuestions[questionIdx];
      const answerText = this.startMessages.get(questionText);

      this.addQuestionToChatSequence(questionText);
      this.scrollChatToBottom();

      setTimeout(() => {
        this.addAnswerToChatSequence(answerText);
        this.scrollChatToBottom();
      }, this.messageDelay);
    },

    askQuestion(questionIdx) {
      this.isLoading = true;

      const questionText = this.questions[questionIdx];
      const answerText = this.messages.get(questionText);

      this.removeQuestion(questionIdx);

      this.addQuestionToChatSequence(questionText);
      this.scrollChatToBottom();

      setTimeout(() => {
        this.addAnswerToChatSequence(answerText);
        this.scrollChatToBottom();
        this.isLoading = false;
      }, this.messageDelay);
    },

    removeQuestion(questionIdx) {
      this.questions.splice(questionIdx, 1);
    },

    addQuestionToChatSequence(questionText) {
      this.chatSequence.push({
        value: questionText,
        type: 'question',
      });
    },

    addAnswerToChatSequence(answerText) {
      this.chatSequence.push({
        value: answerText,
        type: 'answer',
      });
    },

    scrollChatToBottom() {
      this.$nextTick(() => {
        const lastMessageIdx = this.chatSequence.length - 1;
        const lastMessageElement = this.$refs[`msg-${lastMessageIdx}`];

        lastMessageElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
      });
    },
  },
};
</script>

<style scoped>
.chat-bot {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  padding-top: 100px;
}

.chat-bot__messages,
.chat-bot__questions {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.chat-bot__messages {
  flex-direction: column;
  flex-grow: 1;
  overflow-y: scroll;
  margin-bottom: 30px;
}

.chat-bot__message {
  flex-shrink: 0;
  display: flex;
}

.chat-bot__message-wrapper {
  position: relative;
  max-width: 640px;
  font-size: 20px;
  line-height: 23px;
  color: var(--accent-text-color);
  background-color: var(--basic-white-color);
  border: 2px solid var(--basic-bg-color);
  border-radius: 12px;
  padding: 18px 50px 22px;
}

.chat-bot__message .chat-bot__message-wrapper::before,
.chat-bot__message .chat-bot__message-wrapper::after {
  content: '';
  position: absolute;
  border: 36px solid transparent;
}

.chat-bot__message .chat-bot__message-wrapper::before {
  right: -25px;
  bottom: -2px;
  border-bottom: 18px solid var(--basic-bg-color);
  z-index: -1;
}

.chat-bot__message .chat-bot__message-wrapper::after {
  right: -18px;
  bottom: 0;
  border-bottom: 18px solid var(--basic-white-color);
  z-index: 1;
}

.chat-bot__message:not(:last-child) {
  margin-bottom: 45px;
}

.chat-bot__message--question {
  justify-content: flex-end;
  margin-right: 25px;
}

.chat-bot__message--question .chat-bot__message-wrapper {
  align-self: flex-end;
}

.chat-bot__message--answer::before {
  content: '';
  width: 118px;
  height: 114px;
  align-self: flex-end;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.chat-bot__message--answer .chat-bot__message-wrapper {
  align-self: flex-start;
  margin-left: 72px;
  margin-right: 0;
  margin-bottom: 55px;
}

.chat-bot__message--answer .chat-bot__message-wrapper::before {
  left: -25px;
  right: auto;
}

.chat-bot__message--answer .chat-bot__message-wrapper::after {
  left: -18px;
  right: auto;
}

.chat-bot--masha .chat-bot__message--answer::before {
  background-image: url(~@/assets/icons/masha.svg);
}

.chat-bot--petya .chat-bot__message--answer::before {
  background-image: url(~@/assets/icons/petya.svg);
}

.chat-bot--vasya .chat-bot__message--answer::before {
  background-image: url(~@/assets/icons/vasya.svg);
}

.chat-bot__start-lead {
  position: relative;
  width: 108px;
  font-size: 18px;
  line-height: 22px;
  color: var(--default-text-color);
  margin-bottom: 36px;
}

.chat-bot__start-lead::after {
  content: '';
  position: absolute;
  width: 10px;
  height: 10px;
  top: 25%;
  left: calc(100% + 23px);
  border-right: 6px solid var(--basic-bg-color);
  border-bottom: 6px solid var(--basic-bg-color);
  transform: rotate(45deg);
  transform-origin: center;
}

.chat-bot__questions-wrapper {
  width: 100%;
  background-color: var(--accent-secondary-color);
  border: 1px solid var(--basic-text-color);
  border-bottom: 0;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  padding: 40px 80px 0px;
  max-height: 250px;
  min-height: 200px;
  overflow: scroll;
}

.chat-bot__questions {
  flex-wrap: wrap;
}

.chat-bot__question {
  max-width: 365px;
  transition: all 0.5s ease-in-out;
  margin-bottom: 30px;
}

.chat-bot__question:not(:last-child) {
  margin-right: 8px;
}

.chat-bot__ask-question {
  height: 60px;
  font-size: 13px;
  line-height: 15px;
  font-weight: 900;
  color: var(--accent-text-color);
  background-color: var(--basic-white-color);
  border: 2px solid var(--basic-bg-color);
  border-radius: 42px;
  padding: 8px 20px 6px;
  cursor: pointer;
}

.chat-bot__end-questions {
  color: var(--basic-bg-color);
  font-size: 18px;
  text-align: center;
  margin-bottom: 30px;
}
</style>
