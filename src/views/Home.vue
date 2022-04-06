<template>

  <start-screen :scroll-to-element="scrollToElement"></start-screen>

  <second-screen :scroll-to-element="scrollToElement"></second-screen>

  <third-screen></third-screen>

  <rating
    :institutes="institutes"
  />
</template>

<script>
import groupsJSON from '@/static/groups.json';

import StartScreen from '@/components/StartScreen.vue';
import SecondScreen from '@/components/SecondScreen.vue';
import ThirdScreen from '@/components/ThirdScreen.vue';
import Rating from '@/components/Rating.vue';

export default {
  name: 'Home',

  components: {
    StartScreen,
    SecondScreen,
    ThirdScreen,
    Rating,
  },

  data() {
    return {
      groups: groupsJSON,
      institutes: [],
    };
  },

  methods: {
    scrollToElement(id) {
      const element = document.getElementById(id);
      element.scrollIntoView({ behavior: 'smooth' });
    },
  },

  async created() {
    const response = await this.$api.institutes.getRating();

    if (response) {
      this.institutes = response;
    }
  },
};
</script>

<style scoped>
</style>
