import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import ShareIcon from '../../images/shareIcon.svg';
import WhiteHeartIcon from '../../images/whiteHeartIcon.svg';

function FoodDetails() {
  const [food, setFood] = useState('');
  const location = useLocation();
  const { pathname: id } = location;
  const idFood = id.split('foods/')[1];

  useEffect(() => {
    const fetchById = async () => {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idFood}`;
      const response = await fetch(url);
      const data = await response.json();
      setFood(data.meals);
    };
    fetchById();
  }, [idFood]);

  if (food.length === 0) {
    return (<span>Não existe detalhe </span>);
  }

  const ingredients = Object.values(Object.fromEntries(Object.entries(food[0])
    .filter(([key]) => key.includes('Ingredient')))).filter((e) => e !== null);

  const measures = Object.values(Object.fromEntries(Object.entries(food[0])
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
        src={ food[0].strMealThumb }
        alt="Receita"
      />
      <h1 data-testid="recipe-title">
        {food[0].strMeal}
      </h1>
      <p data-testid="recipe-category">
        {food[0].strCategory}
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
      <p data-testid="instructions">{food[0].strInstructions}</p>
      <h2>Video</h2>
      <p>{food[0].strYoutube}</p>
      <iframe
        src={ `https://www.youtube.com/embed/${food[0].strYoutube.split('v=')[1]}` }
        data-testid="video"
        allow="encrypted-media"
        title="video"
      />

      <div data-testid="0-recomendation-card">
        Recommendation
      </div>

      <Button data-testid="start-recipe-btn">Start Recipe</Button>
    </div>
  );
}

export default FoodDetails;
