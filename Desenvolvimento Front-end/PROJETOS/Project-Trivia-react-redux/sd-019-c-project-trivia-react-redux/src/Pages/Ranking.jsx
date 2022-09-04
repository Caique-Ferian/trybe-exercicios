import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

export default class Ranking extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      history: [],
    };
  }

  componentDidMount() {
    const newRank = JSON.parse(localStorage.getItem('ranking'))
      .sort((a, b) => b.score - a.score);
    this.setState({ history: newRank });
  }

  render() {
    const { state: { history } } = this;
    return (
      <div className="ranking-container">
        <header className="header-content">
          <h1 data-testid="ranking-title">Ranking</h1>
          <Link to="/">
            <button type="button" data-testid="btn-go-home">Play Again</button>
          </Link>
        </header>
        <section className="ranking-content">
          {
            history.map(({ name, score, picture }, i) => (
              <div key={ i } className="history-card">
                <p data-testid={ `player-name-${i}` }>{name}</p>
                <p data-testid={ `player-score-${i}` }>
                  Pontuação:
                  {' '}
                  { score }
                </p>
                <img src={ picture } alt={ name } />
              </div>
            ))
          }
        </section>
      </div>
    );
  }
}
