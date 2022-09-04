import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../component/Header';

class Feedback extends PureComponent {
  render() {
    const { player: { assertions, score } } = this.props;
    const THREE = 3;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">
          { assertions <= THREE ? 'Could be better...' : 'Well Done!' }
        </p>
        <p>
          Score:
          <span
            data-testid="feedback-total-score"
          >
            {score}
          </span>
        </p>
        <p>
          Assertions:
          <span
            data-testid="feedback-total-question"
          >
            {assertions}
          </span>
        </p>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Play Again
          </button>
        </Link>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ranking
          </button>
        </Link>
      </div>
    );
  }
}

Feedback.propTypes = {
  player: PropTypes.object,
}.isRequired;

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Feedback);
