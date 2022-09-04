import { fetchByIngredients, fetchByName, fetchByFirstLetter } from '../../services';

export const RequestAction = (obj) => ({
  type: 'API/REQUEST',
  payload: obj,
});
export const RedirectingAction = () => ({
  type: 'REDIRECTING/TRUE',
});
// THUNK
export const fetchIngredientsThunk = (ingredient, type) => async (dispatch) => {
  try {
    const recipeByIngredients = await fetchByIngredients(ingredient, type);
    dispatch(RequestAction(recipeByIngredients));
  } catch (ERROR) {
    console.log(ERROR);
  }
};

export const fetchNameThunk = (name, type) => async (dispatch) => {
  try {
    const recipeByName = await fetchByName(name, type);
    dispatch(RequestAction(recipeByName));
  } catch (ERROR) {
    console.log(ERROR);
  }
};

export const fetchFirstLetterThunk = (firstLetter, type) => async (dispatch) => {
  try {
    const recipeByFirstLetter = await fetchByFirstLetter(firstLetter, type);
    dispatch(RequestAction(recipeByFirstLetter));
  } catch (ERROR) {
    console.log(ERROR);
  }
};

export const fetchByCategoryFood = (category) => async (dispatch) => {
  try {
    const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    const LIMIT = 12;
    const response = await fetch(URL);
    const data = await response.json();
    const result = data.meals.filter((_element, index) => index < LIMIT);
    dispatch(RequestAction(result));
  } catch (ERROR) {
    console.log(ERROR);
  }
};

export const fetchByCategoryDrinks = (category) => async (dispatch) => {
  try {
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    const LIMIT = 12;
    const response = await fetch(URL);
    const data = await response.json();
    const result = data.drinks.filter((_element, index) => index < LIMIT);
    dispatch(RequestAction(result));
  } catch (ERROR) {
    console.log(ERROR);
  }
};

export const fetchFoodsOrDrinks = (type) => async (dispatch) => {
  const typeApi = type === 'Foods' ? 'themealdb' : 'thecocktaildb';
  const resultApi = type === 'Foods' ? 'meals' : 'drinks';
  try {
    const URL = `https://www.${typeApi}.com/api/json/v1/1/search.php?s=`;
    const LIMIT = 12;
    const response = await fetch(URL);
    const data = await response.json();
    const result = data[resultApi].filter((_element, index) => index < LIMIT);
    dispatch(RequestAction(result));
  } catch (ERROR) {
    console.log(ERROR);
  }
};
