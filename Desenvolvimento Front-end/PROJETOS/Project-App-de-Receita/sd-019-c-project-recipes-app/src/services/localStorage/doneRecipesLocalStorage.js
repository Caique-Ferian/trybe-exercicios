const STATE_INITIAL_LOCALSTORAGE = [];
const KEY_DONE_RECIPES = 'doneRecipes';

const save = (value) => {
  window.localStorage.setItem(KEY_DONE_RECIPES, JSON.stringify(value));
};
const read = () => {
  let value = window.localStorage.getItem(KEY_DONE_RECIPES);
  if (!value) {
    save(STATE_INITIAL_LOCALSTORAGE);
    value = STATE_INITIAL_LOCALSTORAGE;
    return value;
  }
  return JSON.parse(value);
};

const doneRecipes = {
  newRecipe(obj) {
    const recipes = read();
    recipes.push(obj);
    save(recipes);
    return recipes;
  },
  recipes() {
    const items = read();
    return items;
  },
};

export default doneRecipes;
