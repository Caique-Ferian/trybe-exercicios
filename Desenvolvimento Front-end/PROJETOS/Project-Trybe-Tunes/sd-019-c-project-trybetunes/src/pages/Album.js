import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      songList: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.gettingAlbumSongs();
  }

  gettingAlbumSongs = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const value = await getMusics(id);
    this.setState({
      songList: value,
      loading: false,
    });
  }

  render() {
    const { loading, songList } = this.state;
    return (
      <div data-testid="page-album">
        {loading ? <Loading />
          : (
            <div key={ songList[1].trackName }>
              <h3 data-testid="album-name">{songList[0].collectionName}</h3>
              <img src={ songList[0].artworkUrl100 } alt={ songList[0].collectionName } />
              <p data-testid="artist-name">{songList[0].artistName}</p>
              {songList.map((element, index) => index !== 0
              && <MusicCard key={ element.trackId } song={ element } />)}
            </div>)}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.object,
  id: PropTypes.string,
}.isRequired;
export default Album;
