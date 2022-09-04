import { GET_TOKEN, getTokenAction } from '../actions';

// const INITIAL_STATE = {
//   token: '',
// };

export const getTokenThunk = () => async (dispatch) => {
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    dispatch(getTokenAction(data));
    // Buscando a fç desenvolvida na Api.js
  } catch (error) {
    console.log(error);
  }
};

const token = (state = '', { type, payload }) => {
  switch (type) {
  case GET_TOKEN:
    return payload.token;
  default:
    return state;
  }
};

export default token;
