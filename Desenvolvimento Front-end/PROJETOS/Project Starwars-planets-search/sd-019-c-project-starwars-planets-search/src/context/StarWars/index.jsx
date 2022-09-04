import React, { useState, useEffect, createContext, useMemo } from 'react';
import PropTypes from 'prop-types';
// import apiResult from '../../apiResult.json';

export const StarWarsContext = createContext();

export default function ProviderStarWars({ children }) {
  const [data, setData] = useState({});
  const [filteredData, setFilteredData] = useState({});
  const MINUS_ONE = -1;
  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';
        const response = await fetch(URL);
        const json = await response.json();
        setData(json.results.sort((a, b) => (a.name > b.name ? 1 : MINUS_ONE)));
        setFilteredData(json.results.sort((a, b) => (a.name > b.name ? 1 : MINUS_ONE)));
        // setData(apiResult.results.sort((a, b) => (a.name > b.name ? 1 : MINUS_ONE)));
        // setFilteredData(apiResult.results
        //   .sort((a, b) => (a.name > b.name ? 1 : MINUS_ONE)));
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlanets();
  }, [MINUS_ONE, data]);
  const contextMemo = useMemo(() => ({
    data,
    filteredData,
    setFilteredData,
  }), [data, filteredData]);
  return (
    <StarWarsContext.Provider value={ contextMemo }>
      {children}
    </StarWarsContext.Provider>
  );
}

ProviderStarWars.propTypes = {
  children: PropTypes.node.isRequired,
};
