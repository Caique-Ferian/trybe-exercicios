import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Profile() {
  const history = useHistory();

  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    setUserEmail(JSON.parse(localStorage.getItem('user')));
  }, []);

  const clearStorage = (event) => {
    event.preventDefault();
    history.push('/');
    localStorage.clear();
  };

  return (
    <div>
      <Header title="Profile" hasSearch={ false } />
      <h1 data-testid="profile-email">
        { userEmail ? userEmail.email : 'Email não informado' }
      </h1>
      <Link to="/done-recipes">
        <button
          data-testid="profile-done-btn"
          type="button"
        >
          Done Recipes
        </button>
      </Link>
      <br />
      <br />
      <Link to="/favorite-recipes">
        <button
          data-testid="profile-favorite-btn"
          type="button"
        >
          Favorite Recipes
        </button>
      </Link>
      <br />
      <br />
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ clearStorage }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}
