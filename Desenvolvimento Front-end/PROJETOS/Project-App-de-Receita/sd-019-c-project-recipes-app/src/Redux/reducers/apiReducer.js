const INITIAL_STATE = {
  apiResult: {},
  isRedirecting: false,
};
const apiReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case 'API/REQUEST':
    return { ...state, apiResult: payload };
  case 'REDIRECTING/TRUE':
    return { ...state, isRedirecting: true };
  default:
    return state;
  }
};

export default apiReducer;
