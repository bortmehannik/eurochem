<template>
  <div class="content popup__main">
    <div v-if="$slots.title" class="popup__title">
      <slot name="title" />
    </div>

    <div v-if="$slots.description" class="popup__description">
      <slot name="description" />
    </div>

    <div v-if="$slots.actions" class="popup__actions">
      <slot name="actions" />
    </div>

    <slot />
  </div>
</template>

<style scoped>
.popup__main {
  padding-top: 50px;
  padding-bottom: 50px;
}

.popup__title {
  font-size: 48px;
  font-weight: 900;
  line-height: 58px;
  color: var(--accent-text-color);
  margin-bottom: 36px;
}

.popup__title p {
  margin: 0;
}

.popup__description {
  max-width: 556px;
  font-size: 20px;
  line-height: 24px;
  color: var(--accent-text-color);
  margin-bottom: 36px;
}

.popup__description p {
  margin: 0;
}

.popup__actions {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
