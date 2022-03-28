import React, { Component } from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from '../../services/api';
import ProductCard from '../../components/ProductCard/index';
import Header from '../../components/Header/index';

export default class Home extends Component {
  constructor() {
    super();
    this.searchForProducts = this.searchForProducts.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getCategoryId = this.getCategoryId.bind(this);

    this.state = {
      category: [],
      query: '',
      products: [],
      categoryId: '',
      qty: 0,
    };
  }

  async componentDidMount() {
    const category = await getCategories();
    const qty = localStorage.getItem('qty');
    this.setState({ category, qty });
  }

  handleChange({ target }) {
    this.setState({ query: target.value });
  }

  getCategoryId({ target: { id } }) {
    this.setState({ categoryId: id }, () => this.searchForProducts());
  }

  increaseQty = () => {
    const qty = localStorage.getItem('qty');
    this.setState({ qty });
  }

  async searchForProducts() {
    const { query, categoryId } = this.state;
    const products = await getProductsFromCategoryAndQuery(query, categoryId);
    this.setState({ products, query: '' });
  }

  // addProductToCart({ target }) {
  //   this.setState((prev) => ({
  //     cart: [...prev.cart, target.previousSibling.id] }));
  // }

  // addProductToCart(infos) {
  //   const cartItems = JSON.parse(localStorage.getItem('cartItems'));
  //   infos.amount += 1;
  //   if (cartItems) {
  //     const cartItem = cartItems.find((item) => item.id === infos.id);
  //     if (cartItem) {
  //       const arr = cartItems.map((item) => {
  //         const a = item.id === infos.id ? ({ ...item, amount: item.amount += 1 }) : item;
  //         return a;
  //       });
  //       console.log(arr);
  //       localStorage.setItem('cartItems', JSON.stringify(arr));
  //     } else {
  //       localStorage.setItem('cartItems', JSON.stringify([...cartItems, infos]));
  //     }
  //   } else {
  //     localStorage.setItem('cartItems', JSON.stringify([infos]));
  //   }
  // }

  render() {
    const { category, products, query, qty } = this.state;
    return (
      <div>
        <Header qty={ qty } />
        <label htmlFor="input">
          <input
            id="input"
            type="text"
            data-testid="query-input"
            onChange={ this.handleChange }
            value={ query }
          />
          <button
            data-testid="query-button"
            type="button"
            onClick={ this.searchForProducts }
          >
            Pesquisa

          </button>
        </label>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <section>
          {
            category.map(({ name, id }) => (
              <button
                key={ id }
                type="button"
                data-testid="category"
                onClick={ this.getCategoryId }
                id={ id }
              >
                { name }
              </button>))
          }
        </section>
        <main>
          { products?.results?.map((element) => (
            <ProductCard
              key={ element.id }
              { ...element }
              increaseQty={ this.increaseQty }
            />)) }
        </main>
      </div>
    );
  }
}
