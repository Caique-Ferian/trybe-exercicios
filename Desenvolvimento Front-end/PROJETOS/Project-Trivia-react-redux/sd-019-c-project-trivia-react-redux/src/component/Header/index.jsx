import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

import './index.scss';
import logo from '../../trivia.png';

class Header extends Component {
  render() {
    const { player: { gravatarEmail, name, score } } = this.props;
    const hashEmail = md5(gravatarEmail).toString();
    const ZERO = 0;
    const imgUrl = `https://www.gravatar.com/avatar/${hashEmail}`;
    return (
      <header>
        <div className="div-1">
          <p>Lado 1 do header</p>
        </div>
        <div>
          <img
            className="trivia-img"
            src={ logo }
            alt="trivia-img"
          />
        </div>
        <div className="div-2">
          <p>
            Score:
            <span data-testid="header-score">{!score ? ZERO : score}</span>
          </p>
          <span data-testid="header-player-name">
            {name ? `${name}` : 'Usuário não encontrado' }
          </span>
          <img
            className="icon-profile"
            data-testid="header-profile-picture"
            src={ imgUrl }
            alt="avatar-img"
          />
        </div>
      </header>
    );
  }
}
Header.propTypes = {
  player: PropTypes.object,
}.isRequired;
const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Header);
