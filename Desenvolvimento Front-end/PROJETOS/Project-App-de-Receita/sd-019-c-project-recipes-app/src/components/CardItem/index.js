import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default function CardItem({ index, name, srcImg }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <h4 data-testid={ `${index}-card-name` }>{name}</h4>
      <img
        className="card-Image"
        src={ srcImg }
        alt={ name }
        data-testid={ `${index}-card-img` }
      />
    </div>
  );
}

CardItem.propTypes = {
  index: PropTypes.number,
  name: PropTypes.string,
  srcImg: PropTypes.string,

}.isRequired;
