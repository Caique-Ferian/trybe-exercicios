import React from 'react';
import PropTypes from 'prop-types';

export default function Forms(props) {
  const { onChange, email, messageDescription, onClick } = props;
  const stars = ['1', '2', '3', '4', '5'];
  return (
    <div>
      <form onSubmit={ (e) => e.preventDefault() }>
        <input
          name="email"
          type="text"
          placeholder="Email"
          data-testid="product-detail-email"
          value={ email }
          onChange={ onChange }
        />
        <div>
          {stars.map((element, index) => (
            <label key={ index } htmlFor={ `${element}-star` }>
              {element}
              <input
                id={ `${element}-star` }
                type="radio"
                name="starRating"
                value={ element }
                onChange={ onChange }
                data-testid={ `${element}-rating` }
              />
            </label>))}
        </div>
        <textarea
          name="messageDescription"
          placeholder="Mensagem(opcional)"
          data-testid="product-detail-evaluation"
          value={ messageDescription }
          onChange={ onChange }
        />
        <button
          type="submit"
          data-testid="submit-review-btn"
          onClick={ onClick }
        >
          Enviar

        </button>
      </form>
    </div>
  );
}

Forms.propTypes = {
  onChange: PropTypes.func,
  email: PropTypes.string,
  messageDescription: PropTypes.string,
}.isRequired;
