import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import './style.css';

export default function CardsDone({
  date,
  category,
  id,
  alcoholicOrNot,
  index,
  name,
  nationality,
  tags,
  img,
  type,
}) {
  const LIMIT_NUMBER = 10;
  const recipeDate = date.substring(0, LIMIT_NUMBER);
  const pageType = type === 'food' ? nationality : alcoholicOrNot;
  const [copy, setCopy] = useState(false);

  function copyedLink() {
    navigator.clipboard.writeText(`${window.location.origin}/${type}s/${id}`);
    setCopy(true);
  }

  return (
    <div>
      <div key={ id }>
        <div className="card_img_recipes">
          <Link key={ id } to={ `/${type}s/${id}` }>
            <img data-testid={ `${index}-horizontal-image` } src={ img } alt="Recipe" />
          </Link>
        </div>
      </div>
      <Link key={ id } to={ `/${type}s/${id}` }>
        <p data-testid={ `${index}-horizontal-name` }>{name}</p>
      </Link>
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        {`Category:  ${pageType} - ${category}`}
      </p>
      <span>
        {tags.map((tag) => (
          <span key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
            {tag}
          </span>
        ))}
      </span>
      <p
        data-testid={ `${index}-horizontal-done-date` }
      >
        {recipeDate}

      </p>
      <div>
        <button
          src={ shareIcon }
          type="button"
          data-testid={ `${index}-horizontal-share-btn` }
          onClick={ () => copyedLink() }
        >
          <img src={ shareIcon } alt="shared Icon " />
        </button>
        { copy && <p>Link copied!</p>}
      </div>
    </div>
  );
}

CardsDone.propTypes = {
  alcoholicOrNot: PropTypes.string,
  category: PropTypes.string,
  date: PropTypes.string,
  id: PropTypes.number,
  img: PropTypes.string,
  index: PropTypes.number,
  name: PropTypes.string,
  nationality: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.string,
}.isRequired;
