<template>
  <register-form
    :institutes="institutes"
    ref="registerForm"
  />
</template>

<script>
import RegisterForm from '@/components/RegisterForm.vue';

export default {
  name: 'Register',

  components: {
    RegisterForm,
  },

  data() {
    return {
      institutes: [],
    };
  },

  created() {
    this.$api.institutes.getInstitutes().then((institutes) => {
      this.institutes = institutes;
    });
  },
};
</script>
