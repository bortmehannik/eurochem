<template>
  <template v-if="isMobile">
    <section class="mobile">
      <div class="mobile__container">
        <img src="./assets/img/mobile/mobile_sun.svg" alt="">
        <p class="text mobile__text">
          Спасибо за интерес к онлайн-игре
          <b>“Комбинатус 2035”</b> от компании
          <b>“ЕвроХим”</b>.
        </p>
        <p class="text mobile__text">
          Чтобы принять участие зайди с компьютера
          или ноутбука - так все этапы путешествия
          пройдут успешно!
        </p>
        <img src="./assets/img/mobile/mobile_instruments.svg" alt="">
      </div>
    </section>
  </template>
  <template v-else>
    <header
      v-if="$route.name === 'map'"
      class="header"
    >
      <div class="container header__container">
        <router-link :to="{ name: 'home' }" class="logo">
          <img
            class="logo__image"
            src="./assets/icons/logo.svg"
            alt="Логотип Еврохим"
            width="172"
            height="37"
          >
        </router-link>

        <ul class="header__actions">
          <li
            class="header__action header__action--scrolling"
            @click="scrollToElement('map__rating')"
          >
            Посмотреть рейтинг ссузов
          </li>
          <li class="header__action">
            <button
              :disabled="user.task_count < 3"
              class="btn"
              @click="showPhrase">Ввести ключевую фразу</button>
          </li>
          <li class="header__action">
            <button class="logout" @click="exit">Выйти</button>
          </li>
        </ul>
      </div>
    </header>

    <main>
      <transition name="fade">
        <alert
          v-if="error"
          type="error"
        >
          {{ error }}
        </alert>
      </transition>

      <component :is="$route.meta.layout || 'div'">
        <router-view/>
      </component>
    </main>

    <teleport to='body'>
      <popup
        class="popup--phrase"
        v-model="isPopupPhraseVisible"
        first-step-bg-color="secondary"
      >
        <phrase @close="successPhrase"></phrase>
      </popup>

      <popup
        class="popup-success-phrase"
        v-model="isPopupSuccessPhraseVisible"
      >
        <p class="popup-success-phrase__text">
          Спасибо за участие! Надеюсь,
          приключение тебе понравилось.
          Мы учли ответ и озвучим результаты
          розыгрыша 8 апреля.
        </p>
      </popup>
    </teleport>
  </template>
</template>

<script>
import 'normalize.css';

import { mapState, mapGetters, mapActions } from 'vuex';

import Alert from '@/components/Alert.vue';
import Popup from '@/components/Popup.vue';
import Phrase from '@/components/Phrase.vue';

export default {
  name: 'App',

  data: () => ({
    isPopupPhraseVisible: false,
    isPopupSuccessPhraseVisible: false,
    isMobile: false,
  }),

  components: {
    Alert,
    Popup,
    Phrase,
  },

  computed: {
    ...mapState(['error', 'errorStatus']),

    ...mapState('auth', [
      'user',
    ]),

    ...mapGetters({
      hasError: 'hasError',
      isAuthenticated: 'auth/isAuthenticated',
    }),
  },

  mounted() {
    document.body.classList.add('page');
    if (window.innerWidth < 1100) {
      this.isMobile = true;
    }
  },

  watch: {
    errorStatus(value) {
      if (value === 401) {
        this.exit();
      }
    },
  },

  methods: {
    ...mapActions('auth', [
      'logout',
    ]),

    showPhrase() {
      this.isPopupPhraseVisible = true;
    },

    successPhrase() {
      this.isPopupPhraseVisible = false;
      this.isPopupSuccessPhraseVisible = true;
    },

    async exit() {
      await this.logout()
        .then(() => this.$router.push({ name: 'home' }))
        .catch((err) => console.log(err));
    },

    scrollToElement(id) {
      const element = document.getElementById(id);
      element.scrollIntoView({ behavior: 'smooth' });
    },
  },
};
</script>

<style scope>
  .mobile {
    background: var(--basic-text-color);
    min-height: 100vh;
  }

  .mobile img {
    display: block;
    margin: 0 auto;
    padding-top: 35px;
  }

  .mobile__container {
    width: 50%;
    min-width: 320px;
    margin: 0 auto;
  }

  p.mobile__text {
    color: #ffffff;
    font-size: 20px;
    line-height: 23px;
    margin-top: 30px;
  }

  p.mobile__text b {
    font-weight: 600;
  }

  .logout {
    color: inherit;
    background: none;
    border: none;
    cursor: pointer;
  }
  .popup-success-phrase {
    background: var(--accent-gradient);
  }
  .popup-success-phrase__text {
    color: var(--basic-text-color);
    font-size: 25px;
    line-height: 28px;
    font-weight: 900;
    text-align: center;
    width: 50%;
    margin: 0 auto;
    position: relative;
  }
  .popup-success-phrase__text:before {
    content: '';
    background: url('./assets/img/phrase/flask_1.svg');
    position: absolute;
    width: 56px;
    height: 73px;
    background-size: contain;
    background-repeat: no-repeat;
    left: -100px;
    top: 21px;
  }

  .popup-success-phrase__text:after {
    content: '';
    background: url('./assets/img/phrase/flask_2.svg');
    position: absolute;
    width: 56px;
    height: 73px;
    background-size: contain;
    background-repeat: no-repeat;
    right: -100px;
    top: 50px;
  }

  .popup-success-phrase .popup__content {
    height: 100vh;
    display: flex;
    align-items: center;
  }

  .header__action--scrolling {
    cursor: pointer;
  }
</style>
