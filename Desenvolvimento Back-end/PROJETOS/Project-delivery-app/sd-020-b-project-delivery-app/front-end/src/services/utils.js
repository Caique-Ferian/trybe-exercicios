import axios from 'axios';

// --- pasta copiada de TFC

const api = axios.create({
  baseURL: `http://${process.env.REACT_APP_HOSTNAME || 'localhost'}:${process.env.REACT_APP_API_PORT || '3001'}`,
});

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export const requestGet = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const requestPost = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const requestDelete = async (endpoint) => api.delete(endpoint);

export default api;

// --- por que a forma copiada de TFC não funcionava de jeito nenhum, eu fiz dessa outra forma
// --- aqui é necessário passar o method, endpoint e body
// --- no caso dá pra usar com POST e PUT(eu acho)

// export const request = async (method, endpoint, body) => {
//   const data = JSON.stringify(body);

//   const config = {
//     method,
//     url: `http://localhost:3001/${endpoint}`,
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     data,
//   };

//   return axios(config)
//     .then((response) => response.data)
//     .catch((error) => error.response);
// };

export const MINPASSWORDLENGTH = 6;

export const MIN_NAME_LENGTH = 12;

export const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;

export const validate = (email, password, name = '', role = '') => {
  if (!name && !role) {
    return regexEmail.test(email) && password.length >= MINPASSWORDLENGTH;
  }
  if (!role) {
    return regexEmail.test(email)
    && password.length >= MINPASSWORDLENGTH && name.length >= MIN_NAME_LENGTH;
  }
  return regexEmail.test(email)
  && password.length >= MINPASSWORDLENGTH && name.length >= MIN_NAME_LENGTH && role;
};

// export default request;
