import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import foodsAndDrinkApi from '../../services/helpers';

export default function Search({ typeApi = 'Foods' }) {
  const [whatSearching, setWhatSearching] = useState('');
  const [input, setInput] = useState('');
  const history = useHistory();
  const data = useSelector((state) => state.apiReducer);
  const dispatch = useDispatch();
  const handleClick = async () => {
    foodsAndDrinkApi(dispatch, whatSearching, input, typeApi);
  };
  useEffect(() => {
    if (typeApi === 'Foods' && data.apiResult?.length === 1) {
      const { idMeal } = data.apiResult[0];
      history.push(`/foods/${idMeal}`);
    }
    if (typeApi === 'Drinks' && data.apiResult?.length === 1) {
      const { idDrink } = data.apiResult[0];
      history.push(`/drinks/${idDrink}`);
    }
  }, [typeApi, data, history, whatSearching]);
  return (
    <div>
      <input
        data-testid="search-input"
        type="text"
        onChange={ ({ target }) => setInput(target.value) }
      />
      <label htmlFor="ingredients">
        <input
          data-testid="ingredient-search-radio"
          id="ingredients"
          value="ingredients"
          type="radio"
          name="typeSearching"
          onChange={ ({ target }) => setWhatSearching(target.value) }
        />
        Ingredients
      </label>
      <label htmlFor="name">

        <input
          id="name"
          data-testid="name-search-radio"
          value="name"
          type="radio"
          name="typeSearching"
          onChange={ ({ target }) => setWhatSearching(target.value) }
        />
        Name
      </label>
      <label htmlFor="first-letter">
        <input
          id="first-letter"
          data-testid="first-letter-search-radio"
          value="first-letter"
          type="radio"
          name="typeSearching"
          onChange={ ({ target }) => setWhatSearching(target.value) }
        />
        First letter
      </label>
      <input
        data-testid="exec-search-btn"
        type="button"
        value="Search"
        onClick={ handleClick }
      />
    </div>
  );
}

Search.propTypes = {
  typeApi: PropTypes.string,
}.isRequired;
