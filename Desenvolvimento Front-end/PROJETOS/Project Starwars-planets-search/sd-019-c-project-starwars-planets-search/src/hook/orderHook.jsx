import { useMemo, useCallback } from 'react';
import useStarWars from './index';

export default function useOrder() {
  const { filteredData, setFilteredData } = useStarWars();
  const orderTable = useCallback(({ sort: query, column }) => {
    let sorting;
    if (query === 'ASC') {
      sorting = filteredData
        .sort((a, b) => ((a[column].localeCompare(b[column]))))
        .sort((a, b) => ((+a[column] - +b[column])));
      setFilteredData([...sorting]);
    } else {
      sorting = filteredData
        .sort((a, b) => ((a[column].localeCompare(b[column]))))
        .sort((a, b) => ((+b[column] - +a[column])));
      setFilteredData([...sorting]);
    }
  }, [filteredData, setFilteredData]);
  return useMemo(() => ({
    orderTable,
  }), [orderTable]);
}
