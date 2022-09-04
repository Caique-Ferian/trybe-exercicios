import { GET_NAME, GET_EMAIL } from '../actions';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  assertions: 0,
  score: 0,
};

const player = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_NAME:
    return {
      ...state,
      name: payload,
    };
  case GET_EMAIL:
    return {
      ...state,
      gravatarEmail: payload,
    };
  case 'score/add':
    return {
      ...state,
      score: payload,
      assertions: state.assertions + 1,
    };

  default:
    return state;
  }
};

export default player;
