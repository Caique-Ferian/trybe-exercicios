import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import doneRecipes from '../../services/localStorage/doneRecipesLocalStorage';
import CardsDone from '../../components/cardDone';

export default function DoneRecipes() {
  const [pressBtn, setpressBtn] = useState('all');
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const getRecipes = doneRecipes.recipes();
    if (getRecipes) {
      setRecipes(getRecipes);
    }
  }, []);

  return (
    <div>
      <Header title="Done Recipes" hasSearch={ false } />
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setpressBtn('food') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setpressBtn('drink') }
      >
        Drinks
      </button>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setpressBtn('all') }
      >
        All
      </button>
      {pressBtn === 'all' ? recipes.map((recipe, index) => (

        <CardsDone
          type={ recipe.type }
          key={ recipe.id }
          id={ recipe.id }
          img={ recipe.image }
          index={ index }
          category={ recipe.category }
          name={ recipe.name }
          date={ recipe.doneDate }
          tags={ recipe.tags }
          nationality={ recipe.nationality }
          alcoholicOrNot={ recipe.alcoholicOrNot }
        />

      )) : recipes
        .filter((recipe) => recipe.type === pressBtn)
        .map((recipe, index) => (
          <CardsDone
            key={ recipe.id }
            stateBtn={ pressBtn }
            type={ recipe.type }
            id={ recipe.id }
            img={ recipe.image }
            index={ index }
            category={ recipe.category }
            name={ recipe.name }
            date={ recipe.doneDate }
            tags={ recipe.tags }
            nationality={ recipe.nationality }
            alcoholicOrNot={ recipe.alcoholicOrNot }
          />
        ))}
    </div>
  );
}
