import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { setToken } from './utils';

export const AuthContext = React.createContext({});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    setUser({});
    navigate('/login');
  };

  const tryLogin = () => {
    const userData = JSON.parse(localStorage.getItem('user')) ?? {};
    // const userData = JSON.parse(localStorage.getItem('user'));

    if (userData.name) {
      setToken(userData.token);
    }
    setUser(userData);
  };

  useEffect(() => {
    tryLogin();
  }, []);

  const contextValue = useMemo(() => ({
    logout,
    tryLogin,
    user,
  }), [user]);

  return (
    <AuthContext.Provider value={ contextValue }>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
