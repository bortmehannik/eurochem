export default (axios) => ({
  getInstitutes() {
    return axios.get('institutes')
      .then((response) => response.data ?? [])
      .catch((err) => console.error(err));
  },

  getRating() {
    return axios.get('institutes/rating')
      .then((response) => response.data ?? [])
      .catch((err) => console.error(err));
  },
});
