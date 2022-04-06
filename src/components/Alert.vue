<template>
  <p
    class="alert"
    :class="{
      [`alert--${type}`]: true
    }"
  >
    <slot />
  </p>
</template>

<script>
export default {
  name: 'Alert',

  props: {
    type: {
      type: String,
      default: 'info',
    },
  },
};
</script>

<style scoped>
.alert {
  position: fixed;
  font-weight: 600;
  bottom: 10px;
  right: 10px;
  padding: 10px 16px;
  z-index: 9;
}

.alert--error {
  color: var(--basic-white-color);
  background-color: var(--error-color);
}
</style>
