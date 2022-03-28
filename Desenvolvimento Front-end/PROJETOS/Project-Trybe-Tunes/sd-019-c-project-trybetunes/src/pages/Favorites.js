import React from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      favoriteList: [],
    };
  }

  componentDidMount() {
    this.gettingFavoriteSongs();
  }

  gettingFavoriteSongs = async () => {
    const value = await getFavoriteSongs();
    this.setState({
      favoriteList: value,
      loading: false,
    });
  }

  remove = (song) => {
    const { favoriteList } = this.state;
    this.setState({ loading: true });
    const value = favoriteList.filter((element) => element.trackName !== song.trackName);
    this.setState({
      loading: false,
      favoriteList: value,
    });
  }

  render() {
    const { loading, favoriteList } = this.state;
    return (
      <div data-testid="page-favorites">
        {loading ? <Loading />
          : (
            <div>
              {favoriteList.map((list, index) => (
                <MusicCard
                  key={ index }
                  song={ list }
                  remove={ this.remove }
                />))}
            </div>
          )}
      </div>
    );
  }
}

export default Favorites;
