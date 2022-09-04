import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import ShareIcon from '../../images/shareIcon.svg';
import WhiteHeartIcon from '../../images/whiteHeartIcon.svg';

function DrinkDetails() {
  const [drink, setDrink] = useState('');
  const location = useLocation();
  const { pathname: id } = location;
  const idDrink = id.split('drinks/')[1];

  useEffect(() => {
    const fetchById = async () => {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`;
      const response = await fetch(url);
      const data = await response.json();
      setDrink(data.drinks);
    };
    fetchById();
  }, [idDrink]);

  if (drink.length === 0) {
    return (<span>Não existe detalhe </span>);
  }

  const ingredients = Object.values(Object.fromEntries(Object.entries(drink[0])
    .filter(([key]) => key.includes('Ingredient')))).filter((e) => e !== null);

  const measures = Object.values(Object.fromEntries(Object.entries(drink[0])
    .filter(([key]) => key.includes('Measure')))).filter((e) => e !== null);

  const totalIngredients = ingredients
    .map((element, index) => (
      measures[index]
        ? element.concat(` - ${measures[index]}`)
        : element
    ));

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={ drink[0].strDrinkThumb }
        alt="Receita da bebida"
      />
      <h1 data-testid="recipe-title">
        {drink[0].strDrink}
      </h1>
      <p data-testid="recipe-category">
        {drink[0].strAlcoholic}
      </p>
      <input
        type="image"
        src={ ShareIcon }
        alt="icone de compartilhamento"
        data-testid="share-btn"
      />
      <input
        type="image"
        src={ WhiteHeartIcon }
        alt="icone de coração para favoritos"
        data-testid="favorite-btn"
      />
      <h2>Ingredients</h2>
      {totalIngredients.map((element, index) => (
        <div key={ index }>
          <p data-testid={ `${index}-ingredient-name-and-measure` }>{element}</p>
        </div>
      ))}
      <h2>Instructions</h2>
      <p data-testid="instructions">{drink[0].strInstructions}</p>

      <div data-testid="0-recomendation-card">
        Recommendation
      </div>

      <Button data-testid="start-recipe-btn">Start Recipe</Button>
    </div>
  );
}

export default DrinkDetails;
