const LIMIT = 12;
const ERROR_MESSAGE = 'Sorry, we haven\'t found any recipes for these filters.';
export const fetchByIngredients = async (ingredient, type) => {
  const typeApi = type === 'Foods' ? 'themealdb' : 'thecocktaildb';
  const requestFilter = type === 'Foods' ? 'meals' : 'drinks';
  const URL = `https://www.${typeApi}.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const request = await fetch(URL);
  const resolve = await request.json();
  return resolve[requestFilter] === null
    ? global.alert(ERROR_MESSAGE)
    : resolve[requestFilter].filter((_element, index) => index < LIMIT);
};

export const fetchByName = async (name, type) => {
  const typeApi = type === 'Foods' ? 'themealdb' : 'thecocktaildb';
  const requestFilter = type === 'Foods' ? 'meals' : 'drinks';
  const URL = `https://www.${typeApi}.com/api/json/v1/1/search.php?s=${name}`;
  const request = await fetch(URL);
  const resolve = await request.json();
  return resolve[requestFilter] === null
    ? global.alert(ERROR_MESSAGE)
    : resolve[requestFilter].filter((_element, index) => index < LIMIT);
};

export const fetchByFirstLetter = async (letter, type) => {
  const typeApi = type === 'Foods' ? 'themealdb' : 'thecocktaildb';
  const requestFilter = type === 'Foods' ? 'meals' : 'drinks';
  const URL = `https://www.${typeApi}.com/api/json/v1/1/search.php?f=${letter}`;
  const request = await fetch(URL);
  const resolve = await request.json();
  return resolve[requestFilter] === null
    ? global.alert(ERROR_MESSAGE)
    : resolve[requestFilter].filter((_element, index) => index < LIMIT);
};

export const surpriseFoods = async () => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
  const request = await fetch(URL);
  const resolve = await request.json();
  console.log(resolve);
  return resolve;
};

export const surpriseDrinks = async () => {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  const request = await fetch(URL);
  const resolve = await request.json();
  console.log(resolve);
  return resolve;
};

export const fetchMealsDetails = async (type) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/list.php?${type}=list`;
  const request = await fetch(URL);
  const response = request.json();
  return response;
};

export const fetchDrinkDetails = async (type) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/list.php?${type}=list`;
  const request = await fetch(URL);
  const response = request.json();
  return response;
};
