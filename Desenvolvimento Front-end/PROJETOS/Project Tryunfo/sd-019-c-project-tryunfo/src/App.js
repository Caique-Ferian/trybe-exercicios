import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import Filter from './components/Filter';
import './components/forms.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor() {
    super();
    this.onInputChange = this.onInputChange.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.savedButtonValidation = this.savedButtonValidation.bind(this);
    this.renderCardList = this.renderCardList.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      savedOptions: [],
      filterName: '',
      filterSelect: 'todas',
      filterTrunfo: false,
    };
  }

  onInputChange({ target }) {
    const { name } = target;
    const value = (target.type === 'checkbox') ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.savedButtonValidation()); // execucao da funcao validateButton feito com ajuda do repositorio de Felipe Fraxe.
  }

  onSaveButtonClick() {
    this.setState((prevState) => ({
      savedOptions: [...prevState.savedOptions, {
        cardName: prevState.cardName,
        cardDescription: prevState.cardDescription,
        cardAttr1: prevState.cardAttr1,
        cardAttr2: prevState.cardAttr2,
        cardAttr3: prevState.cardAttr3,
        cardImage: prevState.cardImage,
        cardRare: prevState.cardRare,
        cardTrunfo: prevState.cardTrunfo,
      }],
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: (!prevState.hasTrunfo && prevState.cardTrunfo), // feito com ajuda do repositorio de Felipe Felipe.
    }));
  }

  savedButtonValidation() {
    const { cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3,
      cardImage, cardRare } = this.state;
    const maxValue = 90;
    const sumLimit = 210;
    const validation = (cardName !== '' && cardDescription !== ''
      && cardImage !== '' && cardRare !== '' && cardAttr1 !== '' && cardAttr2 !== ''
      && cardAttr3 !== '' && cardAttr1 >= 0 && cardAttr1 <= maxValue && cardAttr2 >= 0
      && cardAttr2 <= maxValue && cardAttr3 >= 0 && cardAttr3 <= maxValue
      && (parseInt(cardAttr1, 10)
      + parseInt(cardAttr2, 10) + parseInt(cardAttr3, 10) <= sumLimit));
    if (validation) {
      this.setState({
        isSaveButtonDisabled: false,
      });
    } else {
      this.setState({
        isSaveButtonDisabled: true,
      });
    }
  }

  deleteCard(index) {
    this.setState((prevState) => {
      const [...card] = prevState.savedOptions;
      card.splice(index, 1);
      return ({
        savedOptions: card,
        hasTrunfo: !(prevState.savedOptions[index].cardTrunfo),
      });
    });
  }

  renderCardList() {
    const { savedOptions, filterName, filterSelect, filterTrunfo } = this.state;
    let newCard = [];
    if (filterTrunfo) {
      newCard = [...savedOptions.filter((element) => element.cardTrunfo === true)];
    } else if (!filterName && filterSelect === 'todas') {
      newCard = [...savedOptions];
    } else if (filterName && filterSelect === 'todas') {
      newCard = [...savedOptions.filter((element) => element
        .cardName.includes(filterName))];
    } else if (!filterName && filterSelect !== 'todas') {
      newCard = [...savedOptions.filter((element) => element
        .cardRare === filterSelect)];
    } else if (filterName && filterSelect !== 'todas') {
      newCard = [...savedOptions.filter((element) => element
        .cardName.includes(filterName) && element.cardRare === filterSelect)];
    }
    return (newCard.map((state, index) => (
      <div key={ index } className="mb-3">
        <Card
          cardName={ state.cardName }
          cardDescription={ state.cardDescription }
          cardAttr1={ state.cardAttr1 }
          cardAttr2={ state.cardAttr2 }
          cardAttr3={ state.cardAttr3 }
          cardImage={ state.cardImage }
          cardRare={ state.cardRare }
          cardTrunfo={ state.cardTrunfo }
        />
        <button
          className="btn btn-primary"
          data-testid="delete-button"
          type="submit"
          onClick={ () => this.deleteCard(index) }
        >
          Excluir
        </button>
      </div>)));
  }

  render() {
    const { cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3,
      cardImage, cardRare, cardTrunfo, hasTrunfo, isSaveButtonDisabled,
      filterName, filterSelect, filterTrunfo } = this.state;
    const { onInputChange, onSaveButtonClick, renderCardList } = this;
    return (
      <div className="container">
        <h1>Tryunfo</h1>
        <h2>Adicionar nova carta</h2>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ onInputChange }
          onSaveButtonClick={ onSaveButtonClick }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
        <Filter
          filterName={ filterName }
          filterSelect={ filterSelect }
          filterTrufo={ filterTrunfo }
          onInputChange={ onInputChange }
        />
        <h2>Lista de cartas</h2>
        {renderCardList()}
      </div>
    );
  }
}

export default App;
