<template>
  <div class="avatar">
    <div class="container">
      <div class="avatar__module">
        <img src="@/assets/img/register/avatar.svg" alt="Avatar">
        <div class="avatar__elements">
          <button
            class="avatar__thing"
            v-for="(thing, key, i) in clothes[0].scattered"
            :class="`avatar__thing--${key}`"
            :key="key"
            @click="collectClothes($event, i)"
          >
            <img :src="require(`@/assets/img/register/${thing.path}`)" alt="">
          </button>
        </div>
        <div class="avatar__elements avatar__elements--collected">
          <button
            class="avatar__thing hide"
            v-for="(thing, i) in clothes[0].collected"
            :class="`avatar__thing--${i}`"
            :key="thing"
          >
            <img :src="require(`@/assets/img/register/${thing.path}`)" alt="">
          </button>
        </div>
        <div v-if="isReady" class="avatar__final-phrase">
          <img src="@/assets/img/register/success-phrase.svg">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import clothesJSON from '../static/clothes.json';

export default {
  name: 'Avatar',

  emit: {
    ready: null,
  },

  data() {
    return {
      clothes: clothesJSON,
      numberClothes: 0,
    };
  },

  computed: {
    isReady() {
      return this.numberClothes >= 6;
    },
  },

  watch: {
    isReady() {
      if (this.isReady) {
        this.$emit('ready');
      }
    },
  },

  methods: {
    collectClothes(event, i) {
      const collectedClothes = document.querySelectorAll('.avatar__elements.avatar__elements--collected .avatar__thing');
      const scatteredClothes = document.querySelectorAll('.avatar__elements:not(.avatar__elements--collected) .avatar__thing');
      collectedClothes[i].classList.remove('hide');
      scatteredClothes[i].classList.add('hide');
      this.numberClothes += 1;
    },
  },
};
</script>

<style scoped>
.avatar {
  background: linear-gradient(180deg, #FFFFFF 0%, #00AAE3 45.26%, #FFFFFF 100%);
  padding-bottom: 20px;
  padding-top: 90px;
  margin-top: -100px;
  margin-bottom: 70px;
}

.avatar__elements {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.avatar__elements--collected {
  z-index: 0;
}

.avatar__module {
  text-align: center;
}

.avatar__final-phrase {
  position: absolute;
  z-index: 5;
  left: 320px;
  top: 80px;
}

.avatar__thing {
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  position: absolute;
  opacity: 1;
  transition: 0.3s;
}

.avatar__thing--boots {
  left: 30px;
  bottom: 0;
}

.avatar__thing--gloves {
  left: 200px;
  bottom: 170px;
}

.avatar__thing--vest {
  left: -50px;
  top: 30px;
}

.avatar__thing--costume {
  right: 30px;
}

.avatar__thing--glasses {
  right: 0;
  top: 20px;
}

.avatar__thing--cap {
  right: 365px;
  bottom: 40px;
}

.avatar__thing--costume-collected {
  right: 462px;
  top: 67px;
  z-index: 2;
}

.avatar__thing--vest-collected {
  right: 500px;
  z-index: 3;
  top: 91px;
}

.avatar__thing--boots-collected {
  right: 470px;
  bottom: -6px;
}

.avatar__thing--gloves-collected {
  right: 464px;
  top: 235px;
}

.avatar__thing--glasses-collected {
  right: 522px;
  top: 33px;
}

.avatar__thing--cap-collected {
  right: 520px;
  top: -6px;
}

.hide {
  display: none;
  transition: 0.3s;
}
</style>
