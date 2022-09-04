import React, { useState } from 'react';

function RecommendationCard() {
  const {
    strCategory,
    strMealThumb,
    strAlcoholic,
    drink,
    strDrink,
    strDrinkThumb,
    strMeal,
    meal,
    index,
  } = useState('');

  return (
    <div>
      {meal && (
        <div
          data-testid={ `${index}-recomendation-card` }
        >
          <img src={ strDrinkThumb } alt={ strDrink } />
          <h2>{strAlcoholic}</h2>
          <h1 data-testid={ `${index}-recomendation-title` }>{strDrink}</h1>
        </div>
      )}

      {drink && (
        <div
          data-testid={ `${index}-recomendation-card` }
        >
          <img src={ strMealThumb } alt={ strMeal } />
          <h2>{strCategory}</h2>
          <h1 data-testid={ `${index}-recomendation-title` }>{strMeal}</h1>
        </div>
      )}
    </div>
  );
}

export default RecommendationCard;
