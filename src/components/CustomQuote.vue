<template>
  <div class="quote">
    <div class="quote__left">
      <div class="quote__image-wrapper">
        <div class="quote__image-inner-wrapper">
          <img
            class="quote__image"
            :src="require(`@/assets/images/people/${photo}`)"
            width="273"
            height="273"
            alt="Фотография цитируемого"
          >
        </div>
      </div>

      <p v-if="$slots.name" class="quote__name">
        <slot name="name" />
      </p>

      <p v-if="$slots.profession" class="quote__profession">
        <slot name="profession" />
      </p>
    </div>

    <div class="quote__text">
      <slot name="text" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomQuote',

  props: {
    photo: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.quote {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 84px;
  margin-bottom: 32px;
}

.quote__left {
  width: 273px;
  margin-right: 66px;
}

.quote__image-wrapper {
  position: relative;
  width: 273px;
  height: 273px;
  border-radius: 50%;
  margin-bottom: 3px;
}

.quote__image-inner-wrapper {
  position: relative;
}

.quote__image-wrapper::before,
.quote__image-wrapper::after,
.quote__image-inner-wrapper::before,
.quote__image-inner-wrapper::after {
  content: '';
  position: absolute;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.quote__image-wrapper::before {
  top: 34px;
  left: -55px;
  width: 91px;
  height: 110px;
  background-image: url(~@/assets/icons/droval-1.svg);
  z-index: -1;
}

.quote__image-wrapper::after {
  top: 16px;
  right: 30px;
  width: 27px;
  height: 27px;
  background-image: url(~@/assets/icons/droval-2.svg);
}

.quote__image-inner-wrapper::before {
  top: 185px;
  left: -4px;
  width: 52px;
  height: 50px;
  background-image: url(~@/assets/icons/droval-3.svg);
}

.quote__image-inner-wrapper::after {
  top: 114px;
  right: -30px;
  width: 70px;
  height: 70px;
  background-image: url(~@/assets/icons/droval-4.svg);
}

.quote__image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid var(--basic-bg-color);
}

.quote__name,
.quote__profession {
  font-size: 50px;
  font-weight: 900;
  color: var(--accent-text-color);
  margin: 0;
  padding-left: 18px;
}

.quote__profession {
  font-size: 18px;
  font-weight: 400;
}

.quote__text {
  position: relative;
  max-width: 557px;
  flex-grow: 1;
  background-color: var(--basic-white-color);
  border: 2px solid var(--basic-bg-color);
  border-radius: 24px;
  padding: 31px 28px;
}

.quote__text >>> p {
  font-size: 20px;
  line-height: 24px;
  color: var(--accent-text-color);
  margin: 0;
  margin-bottom: 16px;
}

.quote__text::before,
.quote__text::after {
  content: '';
  position: absolute;
  border: 26.25px solid transparent;
  top: 100px;
  left: -60px;
  border-right: 50px solid var(--basic-bg-color);
  z-index: -1;
}

.quote__text::after {
  left: -57px;
  border-right: 50px solid var(--basic-white-color);
  z-index: 1;
}
</style>
