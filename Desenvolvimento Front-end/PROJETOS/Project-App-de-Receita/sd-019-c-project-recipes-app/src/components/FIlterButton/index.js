import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchByCategoryFood, fetchByCategoryDrinks,
  fetchFoodsOrDrinks } from '../../Redux/actions';
import './style.css';

export default function FilterButton({ type }) {
  const [filter, setFilter] = useState('All');
  const [category, setCategory] = useState([]);
  const dispatch = useDispatch();
  const LIMIT = 5;
  const typeURL = type === 'Foods' ? 'themealdb' : 'thecocktaildb';
  const typeResult = type === 'Foods' ? 'meals' : 'drinks';
  const handleClick = (categoryType) => {
    if (filter === categoryType) {
      dispatch(fetchFoodsOrDrinks(type));
      return;
    }
    if (type === 'Foods') {
      dispatch(fetchByCategoryFood(categoryType));
      setFilter(categoryType);
      return;
    }
    if (type === 'Drinks') {
      dispatch(fetchByCategoryDrinks(categoryType));
      setFilter(categoryType);
    }
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const URL = `https://www.${typeURL}.com/api/json/v1/1/list.php?c=list`;
        const response = await fetch(URL);
        const result = await response.json();
        setCategory(result[typeResult]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, [category, setCategory, typeURL, typeResult]);
  return (
    <div>
      {category.length ? category.map(({ strCategory }, index) => index < LIMIT && (
        <button
          className="button-filter"
          data-testid={ `${strCategory}-category-filter` }
          key={ index }
          type="button"
          onClick={ () => handleClick(strCategory) }
        >
          {strCategory}
        </button>)) : null }
      <button
        className="test"
        data-testid="All-category-filter"
        type="button"
        onClick={ () => dispatch(fetchFoodsOrDrinks(type)) }
      >
        All
      </button>
    </div>
  );
}
FilterButton.propTypes = {
  type: PropTypes.string,
}.isRequired;
