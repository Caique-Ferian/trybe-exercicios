import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  render() {
    const { cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3, cardImage,
      cardRare, cardTrunfo, hasTrunfo, isSaveButtonDisabled,
      onInputChange, onSaveButtonClick } = this.props;
    return (
      <form onSubmit={ (def) => def.preventDefault() }>
        {/* Fazer com que a pagina nao recarregue ao utilizar submit, feito com ajuda do repositorio de Felipe Fraxe. */}
        <div className="input-group mb-3">
          <label htmlFor="id-name" className="input-group-text">
            Nome:
            <input
              className="form-control form-control-sm adjusting-2"
              data-testid="name-input"
              id="id-name"
              name="cardName"
              onChange={ onInputChange }
              type="text"
              value={ cardName }
            />
          </label>
        </div>
        <div className="input-group mb-3">
          <label htmlFor="id-textarea" className="input-group-text">
            Descrição:
            <textarea
              className="form-control form-control-sm adjusting-2"
              data-testid="description-input"
              id="id-textarea"
              name="cardDescription"
              onChange={ onInputChange }
              value={ cardDescription }
            />
          </label>
        </div>
        <div className="input-group mb-3">
          <label htmlFor="id-attr1" className="input-group-text">
            Attr 01:
            <input
              className="form-control form-control-sm adjusting"
              data-testid="attr1-input"
              id="id-attr1"
              max={ 90 }
              min={ 0 }
              name="cardAttr1"
              onChange={ onInputChange }
              type="number"
              value={ cardAttr1 }
            />
          </label>
        </div>
        <div className="input-group mb-3">
          <label htmlFor="id-attr2" className="input-group-text">
            Attr 02:
            <input
              className="form-control form-control-sm adjusting"
              data-testid="attr2-input"
              id="id-attr2"
              max={ 90 }
              min={ 0 }
              name="cardAttr2"
              onChange={ onInputChange }
              type="number"
              value={ cardAttr2 }
            />
          </label>
        </div>
        <div className="input-group mb-3">
          <label htmlFor="id-attr3" className="input-group-text">
            Attr 03:
            <input
              className="form-control form-control-sm adjusting"
              data-testid="attr3-input"
              id="id-attr3"
              max={ 90 }
              min={ 0 }
              name="cardAttr3"
              onChange={ onInputChange }
              type="number"
              value={ cardAttr3 }
            />
          </label>
        </div>
        <div className="input-group mb-3">
          <label htmlFor="id-img" className="input-group-text">
            Imagem:
            <input
              className="form-control form-control-sm"
              data-testid="image-input"
              id="id-img"
              name="cardImage"
              onChange={ onInputChange }
              type="text"
              value={ cardImage }
            />
          </label>
        </div>
        <div className="input-group mb-3">
          <label htmlFor="id-rarity" className="input-group-text">
            Raridade:
            <select
              className="form-select adjusting-3"
              data-testid="rare-input"
              id="id-rarity"
              name="cardRare"
              onChange={ onInputChange }
              value={ cardRare }
            >
              <option>normal</option>
              <option>raro</option>
              <option>muito raro</option>
            </select>
          </label>
        </div>
        { hasTrunfo ? <div><span> Você já tem um Super Trunfo em seu baralho </span></div>
          : (
            <div className="mb-3 form-check">
              <label htmlFor="id-trunfo" className="form-check-label">
                Super Trybe Trunfo
                <input
                  className="form-check-input"
                  checked={ cardTrunfo }
                  data-testid="trunfo-input"
                  id="id-trunfo"
                  name="cardTrunfo"
                  onChange={ onInputChange }
                  type="checkbox"
                />
              </label>
            </div>)}
        <button
          className="btn btn-primary"
          data-testid="save-button"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
          type="submit"
        >
          Salvar
        </button>
      </form>
    );
  }
}
Form.propTypes = {
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.string,
  cardAttr2: PropTypes.string,
  cardAttr3: PropTypes.string,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
  hasTrunfo: PropTypes.bool,
  isSaveButtonDisabled: PropTypes.bool,
  onInputChange: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
}.isRequired;

export default Form;
