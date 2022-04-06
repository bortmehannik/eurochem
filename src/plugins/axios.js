import axios from 'axios';
import store from '@/store';

const customAxios = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

const requestHandler = (request) => {
  const customRequest = { ...request };

  if (store.getters['auth/isAuthenticated']) {
    const { token } = store.state.auth;

    customRequest.headers.Authorization = `Bearer ${token}`;
  }

  return customRequest;
};

const responseHandler = (response) => {
  console.log(response);
  const isSuccessResponse = response.status >= 200 && response.status < 300;

  if (isSuccessResponse) {
    store.commit('SET_ERROR', '');
  }

  return response;
};

const errorHandler = (error) => {
  let errorMessage = '';

  const errorStatus = error.response?.status;

  switch (errorStatus) {
  case 401:
    errorMessage = 'Пользователь не авторизован\n';
    break;
  case 403:
    errorMessage = 'Доступ запрещён';
    break;
  case 404:
    errorMessage = 'Ресурс не найден';
    break;
  case 405:
    errorMessage = 'Действие не поддерживается';
    break;
  case 422:
    if (error.response?.data?.errors) {
      // eslint-disable-next-line prefer-destructuring
      errorMessage = Object.values(error.response.data.errors)[0][0];
    } else {
      errorMessage = error.response.data.message;
    }

    break;
  case 500:
    errorMessage = 'Ошибка в выполнении запроса';
    break;
  default:
    errorMessage = 'Непредвиденная ошибка';

    if (error.status > 200 && error.response.data.message) {
      errorMessage = error.response.data.message;
    }
  }

  store.commit('SET_ERROR', errorMessage);
  store.commit('SET_ERROR_STATUS', errorStatus);

  return Promise.reject(error);
};

customAxios.interceptors.request.use(
  (request) => requestHandler(request),
);

customAxios.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error),
);

export default customAxios;
