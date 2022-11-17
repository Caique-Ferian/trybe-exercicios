import React, { useContext, useState, useEffect } from 'react';
import './ProductCard.css';
import { AppContext } from '../services/AppProvider';

// const INC = 1;
// const DEC = -1;

export default function ProductCard(product) {
  const { id, price, urlImage, name } = product;
  const [qtd, setQtd] = useState();
  // const [isBtnDisabled, setDisabled] = useState(false);
  const { updateCart, getProductCart } = useContext(AppContext);

  const handleChangeQtde = ({ target }) => {
    const { value } = target;
    if (!Number(value)) {
      setQtd(0);
    }
    if (value >= 0) {
      setQtd(parseInt(value, 10));
    }
  };

  // const handleIncQtde = (value) => {
  //   setQtd((prev) => {
  //     if (prev === 0 && value === INC) setQtd(INC);
  //     else if (prev > 0) setQtd(prev + value);
  //     else setQtd(0);
  //   });
  // };

  const handleDecQtde = () => {
    if (qtd === 0) setQtd(0);
    setQtd(qtd - 1);
  };

  // ---- Não sei que bagulho louco é esse, mas não consegui eliminar nenhum dos useEffect

  const changeQtdLocalStorage = () => {
    const cartId = getProductCart(id);
    if (!cartId) {
      setQtd(0);
    } else {
      setQtd(cartId.qtde);
    }
  };

  useEffect(() => {
    // if (qtd <= 0) setDisabled(true);
    // else setDisabled(false);
    updateCart(product, qtd);
  }, [qtd]);

  useEffect(() => {
    changeQtdLocalStorage();
  }, []);

  return (
    <div className="productCard">
      <div className="card-header">
        <span>
          R$
          <span data-testid={ `customer_products__element-card-price-${id}` }>
            { price.replace('.', ',') }
          </span>
        </span>

        <img
          width="50px"
          height="50px"
          src={ urlImage }
          alt="Foto do produto"
          data-testid={ `customer_products__img-card-bg-image-${id}` }
        />
      </div>
      <div className="card-footer">
        <div>
          <p
            data-testid={ `customer_products__element-card-title-${id}` }
          >
            { name }
          </p>
        </div>
        <div>
          <button
            type="button"
            onClick={ () => handleDecQtde() }
            disabled={ qtd <= 0 }
            data-testid={ `customer_products__button-card-rm-item-${id}` }
          >
            -
          </button>
          <input
            type="text"
            value={ qtd }
            onChange={ handleChangeQtde }
            data-testid={ `customer_products__input-card-quantity-${id}` }
          />
          <button
            type="button"
            onClick={ () => setQtd(qtd + 1) }
            data-testid={ `customer_products__button-card-add-item-${id}` }
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
