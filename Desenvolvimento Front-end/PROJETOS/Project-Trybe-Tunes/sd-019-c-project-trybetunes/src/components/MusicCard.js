import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteSong: false,
      loading: false,
      favoriteList: [],
    };
  }

  componentDidMount() {
    this.gettingFavoriteSongs();
  }

  componentDidUpdate() {
    this.addingOrRemovingSongs();
  }

  handleFavorite = ({ target }) => {
    const { checked } = target;
    this.setState({
      favoriteSong: checked,
      loading: true,
    });
  }

  addingOrRemovingSongs = async () => {
    const { favoriteSong } = this.state;
    const { song, remove } = this.props;
    if (favoriteSong) {
      await addSong(song);
      this.setState({
        loading: false,
      });
    }
    if (!favoriteSong) {
      await removeSong(song);
      remove(song);
      this.setState({
        loading: false,
      });
    }
  }
  // Feito com a ajuda do repositório de Sandro Bistene.

  gettingFavoriteSongs = async () => {
    this.setState({
      loading: true,
    });
    const value = await getFavoriteSongs();
    this.setState({
      favoriteList: value,
      loading: false,
    });
    const { favoriteList } = this.state;
    const { song } = this.props;
    if (favoriteList !== []) {
      const listChecked = favoriteList.find((element) => song
        .trackName.includes(element.trackName));
      if (listChecked) {
        this.setState({ favoriteSong: true });
      }
    }
  }

  render() {
    const { song } = this.props;
    const { favoriteSong, loading } = this.state;
    return (
      <div>
        {loading ? <Loading />
          : (
            <div>
              <h4>{ song.trackName }</h4>
              <audio data-testid="audio-component" src={ song.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
              </audio>
              <label htmlFor={ song.trackId }>
                Favorita
                <input
                  id={ song.trackId }
                  data-testid={ `checkbox-music-${song.trackId}` }
                  onChange={ this.handleFavorite }
                  type="checkbox"
                  checked={ favoriteSong }
                />
              </label>
            </div>)}
      </div>
    );
  }
}

MusicCard.propTypes = {
  songList: PropTypes.object,
}.isRequired;

export default MusicCard;
