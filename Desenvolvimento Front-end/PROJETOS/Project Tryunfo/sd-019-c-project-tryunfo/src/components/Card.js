import React from 'react';
import PropTypes from 'prop-types';
import './cards.css';

class Card extends React.Component {
  render() {
    const { cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3,
      cardImage, cardRare, cardTrunfo } = this.props;
    return (
      <div className="card-container">
        <div className="create-card">
          <h2 data-testid="name-card">{ cardName }</h2>
          <img src={ cardImage } alt={ cardName } data-testid="image-card" />
          <p data-testid="description-card" className="description">
            <em>{ cardDescription }</em>
          </p>
          <div className="attributes-adjusting">
            <p data-testid="attr1-card">{`Attr01........................${cardAttr1}`}</p>
            <p data-testid="attr2-card">{`Attr02........................${cardAttr2}`}</p>
            <p data-testid="attr3-card">{`Attr03........................${cardAttr3}`}</p>
            <p data-testid="rare-card">{ cardRare }</p>
          </div>
        </div>
        {
          (cardTrunfo === true) ? <p data-testid="trunfo-card"> Super Trunfo </p>
            : undefined
        }
      </div>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.string,
  cardAttr2: PropTypes.string,
  cardAttr3: PropTypes.string,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
}.isRequired;
export default Card;
