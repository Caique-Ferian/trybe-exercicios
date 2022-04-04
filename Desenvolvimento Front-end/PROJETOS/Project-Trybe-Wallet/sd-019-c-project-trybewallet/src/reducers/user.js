// Esse reducer será responsável por tratar as informações da pessoa usuária
const initialState = {
  email: '',
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
  case 'user/addUserEmail':
    return { email: action.payload };
  default:
    return state;
  }
}
