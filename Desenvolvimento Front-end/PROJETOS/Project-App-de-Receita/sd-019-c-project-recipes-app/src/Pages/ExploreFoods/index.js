import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { surpriseFoods } from '../../services';

export default function ExploreFoods() {
  return (
    <>
      <Header title="Explore Foods" hasSearch={ false } />
      <Link to="/explore/foods/ingredients">
        <button
          data-testid="explore-by-ingredient"
          type="button"
        >
          By Ingredient
        </button>
      </Link>
      <Link to="/explore/foods/nationalities">
        <button
          data-testid="explore-by-nationality"
          type="button"
        >
          By Nationality
        </button>
      </Link>
      <button
        data-testid="explore-surprise"
        type="submit"
        onClick={ surpriseFoods }
      >
        Surprise me!
      </button>
      <Footer />
    </>
  );
}
