import React, { Component } from 'react';
import CartItem from '../../components/CartItem';

export default class index extends Component {
  constructor() {
    super();
    this.state = {
      cartItems: [],
    };
  }

  componentDidMount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    this.setState({ cartItems });
  }

  render() {
    const { cartItems } = this.state;
    return (
      <div>
        <div>
          { cartItems?.map((item) => (<CartItem key={ item.id } { ...item } />)) }
        </div>
        <form>
          <input data-testid="checkout-fullname" placeholder="Nome Completo" />
          <input data-testid="checkout-email" placeholder="Email" />
          <input data-testid="checkout-cpf" placeholder="CPF" />
          <input data-testid="checkout-phone" placeholder="Telefone" />
          <input data-testid="checkout-cep" placeholder="CEP" />
          <input data-testid="checkout-address" placeholder="Endereço" />
        </form>
      </div>
    );
  }
}
