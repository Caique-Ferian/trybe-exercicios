import { getApiQuestionsAction } from '../actions';

const initialState = {};

export function fetchApiQuestions(token) {
  return async function thunkExecution(dispatch) {
    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const data = await response.json();
      dispatch(getApiQuestionsAction(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export default function gameReducer(state = initialState, { type, payload }) {
  switch (type) {
  case 'api/RequestSuccess':
    return payload;
  default:
    return state;
  }
}
