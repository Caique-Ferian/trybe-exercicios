import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      artistAlbum: [],
      searchBtnDisabled: true,
      artist: '',
      loading: false,
      redirect: false,
      message: '',
    };
  }

  handleSearch = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.searchButtonValidation());
  }

   onSearchButtonClick = async () => {
     this.setState({
       loading: true,
       artistAlbum: '',
     });
     const { artist } = this.state;
     const value = await searchAlbumsAPI(artist);
     this.setState({
       loading: false,
       artistAlbum: value,
     }, () => this.renderMessage());
   }

  searchButtonValidation = () => {
    const { artist } = this.state;
    const minLength = 2;
    if (artist.length >= minLength) {
      this.setState({
        searchBtnDisabled: false,
      });
    } else {
      this.setState({
        searchBtnDisabled: true,
      });
    }
  }

  renderMessage = () => {
    const { artist, artistAlbum } = this.state;
    if (artistAlbum.length < 1) {
      this.setState({
        message: 'Nenhum álbum foi encontrado',
        artist: '',
      });
    } else {
      this.setState({
        message: `Resultado de álbuns de: ${artist}`,
        artist: '',
      });
    }
  }

  renderAlbums = () => {
    const { artistAlbum } = this.state;
    return (
      <div>
        { artistAlbum.map((element) => (
          <div key={ element.collectionId }>
            <img src={ element.artworkUrl100 } alt={ element.collectionName } />
            <h4>{ element.collectionName }</h4>
            <p>{ element.artistName }</p>
            <Link
              data-testid={ `link-to-album-${element.collectionId}` }
              to={ `/album/${element.collectionId}` }
            >
              Ver album
            </Link>
          </div>))}
      </div>);
  }

  render() {
    const { artist, loading, searchBtnDisabled, redirect, message } = this.state;
    return (
      <div data-testid="page-search">
        {loading ? <Loading path="/search" redirect={ redirect } />
          : (
            <div>
              <form onSubmit={ (e) => e.preventDefault() }>
                <input
                  data-testid="search-artist-input"
                  name="artist"
                  onChange={ this.handleSearch }
                  type="text"
                  value={ artist }
                />
                <button
                  data-testid="search-artist-button"
                  disabled={ searchBtnDisabled }
                  onClick={ this.onSearchButtonClick }
                  type="submit"
                >
                  Pesquisar
                </button>
              </form>
              <h2>{message}</h2>
              {this.renderAlbums()}
            </div>
          )}
      </div>
    );
  }
}

export default Search;
