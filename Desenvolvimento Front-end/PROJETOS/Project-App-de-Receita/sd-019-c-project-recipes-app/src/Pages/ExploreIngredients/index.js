import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { fetchMealsDetails, fetchDrinkDetails } from '../../services';
import foodsAndDrinkApi from '../../services/helpers';
import { RedirectingAction } from '../../Redux/actions';

export default function ExploreIngredients({ location }) {
  const [ingredient, setIngredient] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const isFood = location.pathname.includes('foods');

  const getRecipesData = useCallback(async () => {
    const listIngredients = isFood
      ? await fetchMealsDetails('i')
      : await fetchDrinkDetails('i');
    const listIngredientsResult = isFood
      ? listIngredients.meals
      : listIngredients.drinks;
    setIngredient(listIngredientsResult);
  }, [isFood]);

  useEffect(() => {
    getRecipesData();
  }, [getRecipesData]);

  const MAGIC_NUMBER = 12;
  const handleClick = (clickedIng) => {
    if (isFood) {
      dispatch(RedirectingAction());
      foodsAndDrinkApi(dispatch, 'ingredients', clickedIng, 'Foods');
      history.push('/foods');
    } else {
      dispatch(RedirectingAction());
      foodsAndDrinkApi(dispatch, 'ingredients', clickedIng, 'Drinks');
      history.push('/drinks');
    }
  };
  return (
    <div>
      <Header title="Explore Ingredients" hasSearch={ false } />
      <div>
        {ingredient.map((item, index) => {
          if (index < MAGIC_NUMBER) {
            const { idIngredient, strIngredient } = item;
            const { strIngredient1 } = item;
            const imgStr = isFood
              ? `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png`
              : `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png`;

            return (
              <div
                key={ isFood ? idIngredient : strIngredient1 }
                data-testid={ `${index}-ingredient-card` }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ imgStr }
                  alt={ `${strIngredient}; click to see recipes with this ingredient` }
                />
                <button
                  type="button"
                  onClick={ () => (isFood
                    ? handleClick(strIngredient) : handleClick(strIngredient1)) }
                >
                  <h4 data-testid={ `${index}-card-name` }>
                    { strIngredient || strIngredient1 }
                  </h4>
                </button>
              </div>
            );
          }
          return null;
        })}
      </div>
      <Footer />
    </div>
  );
}

ExploreIngredients.propTypes = {
  location: PropTypes.object,
}.isRequired;
