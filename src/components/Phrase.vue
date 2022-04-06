<template>
  <div class="phrase">
    <label for="phrase" class="phrase__label">Введите кодовую фразу</label>
    <input id="phrase" type="text" v-model="phrase" class="phrase__input">
  </div>
  <button class="btn phrase__btn" @click="sendPhrase">Отправить</button>
</template>
<script>

export default {
  data: () => ({
    phrase: '',
  }),
  emits: ['close'],
  methods: {
    sendPhrase() {
      this.$api.user.sendPhrase({
        keyPhrase: this.phrase,
      });
      this.$emit('close');
    },
  },
};
</script>
<style>
    .popup--phrase {
        background: var(--accent-gradient);
    }

    .phrase {
        position: relative;
    }

    .phrase:before {
        content: '';
        width: 0;
        height: 0;
        border-top: 30px solid var(--basic-bg-color);
        border-right: 30px solid transparent;
        position: absolute;
        bottom: -30px;
        left: 50px;
    }

    .phrase:after {
        content: '';
        width: 0;
        height: 0;
        border-top: 28px solid var(--basic-white-color);
        border-right: 28px solid transparent;
        position: absolute;
        bottom: -27px;
        left: 51px;
    }

    .popup--phrase .popup__content {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

    .phrase__input {
        height: 60px;
        border: 1px solid var(--basic-bg-color);
        width: 500px;
        outline: none;
        padding: 0 15px;
    }

    .phrase__label {
        display: block;
        color: var(--basic-text-color);
        font-size: 20px;
        margin-bottom: 34px;
    }

    .phrase__btn {
        margin-top: 30px;
    }
</style>
