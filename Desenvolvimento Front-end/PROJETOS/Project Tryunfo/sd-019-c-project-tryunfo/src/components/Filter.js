import React from 'react';
import PropTypes from 'prop-types';

class Filter extends React.Component {
  render() {
    const { filterName, filterSelect, filterTrunfo, onInputChange } = this.props;
    return (
      <div>
        <div className="input-group mb-3">
          <input
            className="form-control form-control-sm"
            data-testid="name-filter"
            name="filterName"
            onChange={ onInputChange }
            type="text"
            value={ filterName }
          />
        </div>
        <div className="input-group mb-3">
          <select
            className="form-select"
            data-testid="rare-filter"
            name="filterSelect"
            onChange={ onInputChange }
            value={ filterSelect }
          >
            <option>todas</option>
            <option>normal</option>
            <option>raro</option>
            <option>muito raro</option>
          </select>
        </div>
        <div className="mb-3 form-check">
          <label htmlFor="id-trunfoFilter" className="form-check-label">
            Super Trybe Trunfo
            <input
              className="form-check-input"
              checked={ filterTrunfo }
              data-testid="trunfo-filter"
              id="id-trunfoFilter"
              name="filterTrunfo"
              onChange={ onInputChange }
              type="checkbox"
            />
          </label>
        </div>
      </div>
    );
  }
}

Filter.propTypes = {
  filterName: PropTypes.string,
  filterSelect: PropTypes.string,
  filterTrunfo: PropTypes.bool,
  onInputChange: PropTypes.func,
}.isRequired;

export default Filter;
