import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <div
      data-testid="footer"
      className="footer"
    >
      <Link to="/drinks">
        <img
          src={ drinkIcon }
          alt="icone de drink"
          data-testid="drinks-bottom-btn"
        />
      </Link>

      <Link to="/explore">
        <img
          src={ exploreIcon }
          alt="icone de explorar"
          data-testid="explore-bottom-btn"
        />
      </Link>

      <Link to="/foods">
        <img
          src={ mealIcon }
          alt="iconde de comidas"
          data-testid="food-bottom-btn"
        />
      </Link>
    </div>
  );
}

export default Footer;
