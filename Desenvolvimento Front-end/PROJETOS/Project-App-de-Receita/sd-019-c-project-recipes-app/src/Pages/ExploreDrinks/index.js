import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { surpriseDrinks } from '../../services';

export default function ExploreDrinks() {
  return (
    <>
      <Header title="Explore Drinks" hasSearch={ false } />
      <Link to="/explore/drinks/ingredients">
        <button
          data-testid="explore-by-ingredient"
          type="button"
        >
          By Ingredient
        </button>
      </Link>
      <button
        data-testid="explore-surprise"
        type="submit"
        onClick={ surpriseDrinks }
      >
        Surprise me!
      </button>
      <Footer />
    </>
  );
}
