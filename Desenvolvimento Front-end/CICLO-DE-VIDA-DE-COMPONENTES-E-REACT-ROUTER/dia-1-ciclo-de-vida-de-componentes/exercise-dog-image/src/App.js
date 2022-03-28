import React from 'react';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.fetchDog = this.fetchDog.bind(this);
    this.saveDog = this.saveDog.bind(this);
    this.renderDog = this.renderDog.bind(this);
    this.state = {
      dogApi: undefined,
      name: '',
      savedDog: [],
    };
  }

  componentDidMount() {
    if (localStorage.namedDogURL) {
      const jsonParse = JSON.parse(localStorage.namedDogURL);
      this.setState({
        dogApi: jsonParse[0],
        savedDog: jsonParse,
      });
    } else {
      this.fetchDog();
    }
  }

  shouldComponentUpdate(_nextProps, nextState) {
    if (nextState.dogApi.message.includes('terrier')) {
      return false;
    }
    return true;
  }

  componentDidUpdate(_prevProps, prevState) {
    const { dogApi } = this.state;
    if (prevState.dogApi !== dogApi) {
      const dogBreed = dogApi.message.split('/')[4];
      alert(dogBreed);
    }
  }

  async fetchDog() {
    const url = 'https://dog.ceo/api/breed/hound/images/random';
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      dogApi: data,
    });
    // localStorage.clear();
  }

  saveDog() {
    const { dogApi, name, savedDog } = this.state;
    const dogArray = [...savedDog, dogApi, name];
    this.setState({
      savedDog: dogArray,
    });
    localStorage.setItem('namedDogURL', JSON.stringify(dogArray));
  }

  renderDog() {
    const { dogApi } = this.state;
    return (
      <div>
        <img src={ dogApi.message } alt="Dog" />
      </div>
    );
  }

  render() {
    const { dogApi, name } = this.state;
    return (
      <div>
        { !dogApi ? <div>loading...</div>
          : this.renderDog() }
        <button
          type="button"
          onClick={ this.fetchDog }
        >
          Busque outro doguinho
        </button>
        <div className="container">
          <input
            name="name"
            onChange={ ({ target }) => this.setState({ name: target.value }) }
            placeholder="Dê um nome para o doguinho"
            type="text"
            value={ name }
          />
          <button
            type="button"
            onClick={ this.saveDog }
          >
            Salvar
          </button>
        </div>
      </div>
    );
  }
}

export default App;
