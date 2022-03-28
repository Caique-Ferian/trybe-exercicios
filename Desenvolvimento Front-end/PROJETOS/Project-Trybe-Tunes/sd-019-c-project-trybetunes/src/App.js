import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Loading from './pages/Loading';
import Header from './components/Header';
import { createUser } from './services/userAPI';

class App extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.buttonValidation = this.buttonValidation.bind(this);
    this.onButtonClick = this.onButtonClick.bind(this);
    this.state = {
      name: '',
      isSubmitButtonDisabled: true,
      loading: false,
      redirect: false,
      path: '',
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.buttonValidation());
  }

  async onButtonClick() {
    this.setState({
      loading: true,
      redirect: true,
      path: '/search',
    });
    const { name } = this.state;
    await createUser({ name });
    this.setState({
      loading: false,
      redirect: false,
      path: '',
    });
  }

  buttonValidation() {
    const { name } = this.state;
    const minLength = 3;
    if (name.length >= minLength) {
      this.setState({
        isSubmitButtonDisabled: false,
      });
    } else {
      this.setState({
        isSubmitButtonDisabled: true,
      });
    }
  }

  render() {
    const { name, isSubmitButtonDisabled, loading,
      path, redirect } = this.state;
    return (
      <div>
        <h1>Trybe Tunes</h1>
        <BrowserRouter>
          {/* Feito com ajuda do repositório de Allan Carvalho */}
          {loading ? <Loading path={ path } redirect={ redirect } />
            : (
              <Switch>
                <Route
                  exact
                  path="/"
                  render={
                    () => (
                      <Login
                        name={ name }
                        isSubmitButtonDisabled={ isSubmitButtonDisabled }
                        handleChange={ this.handleChange }
                        onButtonClick={ this.onButtonClick }
                      />)
                  }
                />
                <Route
                  exact
                  path="/search"
                  render={
                    () => (
                      <div>
                        <Header />
                        <Search />
                      </div>)
                  }
                />
                <Route
                  exact
                  path="/album/:id"
                  render={
                    (props) => (
                      <div>
                        <Header />
                        <Album { ...props } />
                      </div>)
                  }
                />
                <Route
                  exact
                  path="/favorites"
                  render={
                    () => (
                      <div>
                        <Header />
                        <Favorites />
                      </div>)
                  }
                />
                <Route
                  exact
                  path="/profile"
                  render={
                    () => (
                      <div>
                        <Header />
                        <Profile />
                      </div>)
                  }
                />
                <Route
                  exact
                  path="/profile/edit"
                  render={
                    () => (
                      <div>
                        <Header />
                        <ProfileEdit />
                      </div>)
                  }
                />
                <Route
                  exact
                  path="/*"
                  render={
                    () => (
                      <div>
                        <Header />
                        <NotFound />
                      </div>)
                  }
                />
              </Switch>
            )}
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
