import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import auth from './auth';

export default createStore({
  state: {
    error: '',
    errorStatus: null,
  },

  getters: {
    hasError: (state) => !!state.error,
  },

  mutations: {
    SET_ERROR(state, payload) {
      state.error = payload;
    },

    SET_ERROR_STATUS(state, payload) {
      state.errorStatus = payload;
    },
  },

  actions: {
  },

  modules: {
    auth,
  },

  plugins: [createPersistedState()],
});
