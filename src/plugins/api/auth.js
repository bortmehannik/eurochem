export default (axios) => ({
  register(formData) {
    return axios.post('register', formData)
      .then((response) => response.data)
      .catch((err) => console.error(err));
  },

  login(formData) {
    return axios.post('login', formData)
      .then((response) => response.data)
      .catch((err) => console.error(err));
  },

  logout() {
    return axios.post('logout').catch((err) => console.error(err));
  },
});
