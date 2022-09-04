import { useState, useMemo, useCallback, useEffect } from 'react';
import useStarWars from './index';

export default function useFilterByNumericValues() {
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [filtering, setFiltering] = useState(false);
  const { data, setFilteredData } = useStarWars();
  const initialSelects = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];
  const [selects, setSelects] = useState(initialSelects);
  const addFilters = useCallback((obj) => {
    const index = filterByNumericValues.findIndex(({ column }) => column === obj.column);
    const NOT_ADDED = -1;
    if (index === NOT_ADDED) setFilterByNumericValues([...filterByNumericValues, obj]);
  }, [filterByNumericValues]);

  const filterValues = useCallback(() => {
    const result = data.filter((element) => filterByNumericValues
      .every(({ column, comparison, value }) => {
        if (comparison === 'maior que') return +element[column] > value;
        if (comparison === 'menor que') return +element[column] < value;
        return element[column] === value;
      }));
    setFilteredData(result);
  }, [data, filterByNumericValues, setFilteredData]);
  const removeFilter = useCallback((filter) => {
    if (filter === 'ALL') {
      setFilterByNumericValues([]);
      setSelects(initialSelects);
    } else {
      setFilterByNumericValues(filterByNumericValues
        .filter(({ column }) => column !== filter));
      setSelects([...selects, filter]);
    }
  }, [filterByNumericValues, initialSelects, selects]);
  useEffect(() => {
    if (filtering) {
      filterValues();
    }
  }, [data.length, filterValues, filtering]);
  return useMemo(() => ({
    filterByNumericValues,
    setFilterByNumericValues,
    addFilters,
    setFiltering,
    removeFilter,
    selects,
    setSelects,
  }), [addFilters, filterByNumericValues, removeFilter, selects]);
}
