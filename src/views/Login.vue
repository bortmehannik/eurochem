<template>
  <login-form ref="loginForm" />
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';

export default {
  name: 'Login',

  components: {
    LoginForm,
  },
};
</script>
