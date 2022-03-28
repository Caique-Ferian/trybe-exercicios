import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class Loading extends React.Component {
  render() {
    const { path, redirect } = this.props;
    return (
      <div>
        <h1>Carregando...</h1>
        { redirect && <Redirect to={ path } /> }
      </div>
    );
  }
}
Loading.propTypes = {
  path: PropTypes.string,
  redirect: PropTypes.bool,
}.isRequired;
export default Loading;
