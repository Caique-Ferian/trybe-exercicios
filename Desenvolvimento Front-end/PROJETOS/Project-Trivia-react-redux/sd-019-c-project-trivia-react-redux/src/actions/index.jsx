export const GET_NAME = 'GET_NAME';
export const GET_EMAIL = 'GET_EMAIL';
export const GET_TOKEN = 'GET_TOKEN';

export const getName = (payload) => ({
  type: GET_NAME,
  payload,
});

export const getEmail = (payload) => ({
  type: GET_EMAIL,
  payload,
});

export const getTokenAction = (payload) => ({
  type: GET_TOKEN,
  payload,
});

export const getApiQuestionsAction = (json) => ({
  type: 'api/RequestSuccess',
  payload: json,
});

export const addScoreAction = (score) => ({
  type: 'score/add',
  payload: score,
});
