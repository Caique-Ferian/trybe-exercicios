import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Explore() {
  return (
    <>
      <Header title="Explore" hasSearch={ false } />
      <Link to="/explore/foods">
        <button
          data-testid="explore-foods"
          type="button"
        >
          Explore Foods
        </button>
      </Link>
      <Link to="/explore/drinks">
        <button
          data-testid="explore-drinks"
          type="button"
        >
          Explore Drinks
        </button>
      </Link>
      <Footer />
    </>
  );
}
