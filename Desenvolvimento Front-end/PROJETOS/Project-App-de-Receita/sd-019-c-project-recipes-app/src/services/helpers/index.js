import { fetchIngredientsThunk,
  fetchNameThunk, fetchFirstLetterThunk } from '../../Redux/actions';

const FL = 'first-letter';

const foodsAndDrinkApi = (dispatch, whatSearching, value, type) => {
  if (whatSearching === 'ingredients') dispatch(fetchIngredientsThunk(value, type));
  if (whatSearching === 'name') dispatch(fetchNameThunk(value, type));
  if (whatSearching === FL) {
    if (value.length === 1) dispatch(fetchFirstLetterThunk(value, type));
    else {
      global.alert('Your search must have only 1 (one) character');
    }
  }
};

export default foodsAndDrinkApi;
