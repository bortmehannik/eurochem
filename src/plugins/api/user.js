export default (axios) => ({
  addPoints(payload) {
    return axios.post('user/add-points', payload)
      .then((response) => response.data)
      .catch((err) => console.error(err));
  },
  getUserInfo() {
    return axios.get('user/info')
      .then((response) => response.data)
      .catch((err) => console.error(err));
  },
  sendPhrase(payload) {
    return axios.post('user/save-key-phrase', payload)
      .then((response) => response.data)
      .catch((err) => console.error(err));
  },
});
