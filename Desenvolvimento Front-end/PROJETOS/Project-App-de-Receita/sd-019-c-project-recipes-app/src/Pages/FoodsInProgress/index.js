import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import ShareIcon from '../../images/shareIcon.svg';
import WhiteHeartIcon from '../../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../../images/blackHeartIcon.svg';

function FoodsInProgress() {
  const [food, setFood] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [salveLink, setSalveLink] = useState(false);
  const [enable, setEnable] = useState(true);
  const location = useLocation();
  const history = useHistory();
  const { pathname: id } = location;
  const idProgress = id.split('foods/')[1].split('/')[0];

  useEffect(() => {
    const fetchById = async () => {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idProgress}`;
      const response = await fetch(url);
      const data = await response.json();
      setFood(data.meals);
    };
    fetchById();
  }, [idProgress]);

  if (food.length === 0) {
    return (<span>Não existe progresso </span>);
  }

  const ingredients = Object.values(Object.fromEntries(Object.entries(food[0])
    .filter(([key]) => key.includes('Ingredient')))).filter((e) => e !== null)
    .filter((ingredient) => ingredient.length > 0);

  const measures = Object.values(Object.fromEntries(Object.entries(food[0])
    .filter(([key]) => key.includes('Measure')))).filter((e) => e !== null);

  const totalIngredients = ingredients
    .map((element, index) => (
      measures[index]
        ? element.concat(` - ${measures[index]}`)
        : element
    ));

  const doneRecipes = () => {
    history.push('/done-recipes');
  };

  // https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard

  const copyToClipBoard = async () => {
    await navigator.clipboard.writeText(`${window.location}`.split('/in-progress')[0]);
    setSalveLink(true);
  };

  const isFavorite = () => {
    setFavorite(!favorite);
  };

  const buttonFinish = () => {
    const verify = document.querySelectorAll('input[type=checkbox]:checked').length;
    const checkbox = document.querySelectorAll('input[type=checkbox]').length;
    if (verify === checkbox) {
      setEnable(false);
    } else {
      setEnable(true);
    }
  };

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
      {salveLink ? 'Link copied!'
        : (
          <input
            onClick={ copyToClipBoard }
            type="image"
            src={ ShareIcon }
            alt="icone de compartilhamento"
            data-testid="share-btn"
          />
        )}
      <input
        onClick={ isFavorite }
        type="image"
        src={ favorite ? BlackHeartIcon : WhiteHeartIcon }
        alt="icone de coração para favoritos"
        data-testid="favorite-btn"
      />
      <h2>Ingredients</h2>
      {totalIngredients.map((element, index) => (
        <div key={ index } data-testid={ `${index}-ingredient-step` }>
          <input
            onChange={ buttonFinish }
            type="checkbox"
            name={ element }
          />
          <label htmlFor={ element }>
            { element }
          </label>
        </div>
      ))}
      <h2>Instructions</h2>
      <p data-testid="instructions">{food[0].strInstructions}</p>

      <Button
        disabled={ enable }
        onClick={ doneRecipes }
        data-testid="finish-recipe-btn"
      >
        Finish Recipe

      </Button>
    </div>
  );
}

export default FoodsInProgress;
