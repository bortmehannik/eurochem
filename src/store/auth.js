export default {
  namespaced: true,

  state: {
    token: '',
    user: {},
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
  },

  actions: {
    async register({ commit }, payload) {
      const response = await this.$api.auth.register(payload);

      if (response) {
        const { user, token } = response;

        commit('SET_TOKEN', token);
        commit('SET_USER', user);
      }
    },

    async login({ commit }, payload) {
      const response = await this.$api.auth.login(payload);

      if (response) {
        const { user, token } = response;

        commit('SET_TOKEN', token);
        commit('SET_USER', user);
      }
    },

    async logout({ commit }) {
      await this.$api.auth.logout();
      commit('SET_TOKEN', '');
    },

    async updatePoints({ commit }) {
      const response = await this.$api.user.getUserInfo();

      if (response) {
        commit('SET_USER', response);
      }
    },
  },

  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload;
    },

    SET_USER(state, payload) {
      state.user = payload;
    },
  },
};
