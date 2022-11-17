import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import AppProvider from './AppProvider';
// import { setToken } from './utils';

export default function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('user')) ?? {};
  // const user = JSON.parse(localStorage.getItem('user'));

  // setToken(user.token);

  return (
    <div>
      {
        user.name
          ? <AppProvider>{ children }</AppProvider>
          : <Navigate to="/login" />
      }
    </div>
  );
}

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
};
