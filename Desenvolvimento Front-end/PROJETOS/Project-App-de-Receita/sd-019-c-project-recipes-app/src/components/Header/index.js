import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import './header.css';
import Search from '../Search';

export default function Header({ title, hasSearch = true }) {
  const [isSearching, setIsSearching] = useState(false);
  return (
    <header className="header-container">
      <div>
        <Link to="/profile">
          <button type="button">
            <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile-Icon" />
          </button>
        </Link>
      </div>
      <div>
        <h2 data-text={ title } data-testid="page-title">{title}</h2>
      </div>
      {hasSearch ? (
        <button
          type="button"
          onClick={ () => setIsSearching(!isSearching) }
        >
          <img data-testid="search-top-btn" src={ searchIcon } alt="Search-Icon" />
        </button>
      ) : null}
      {isSearching ? (
        <Search typeApi={ title === 'Drinks' ? 'Drinks' : 'Foods' } />
      )
        : null}

    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;
