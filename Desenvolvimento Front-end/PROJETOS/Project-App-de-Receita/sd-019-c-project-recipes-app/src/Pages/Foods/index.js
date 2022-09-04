import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchFoodsOrDrinks } from '../../Redux/actions';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CardItem from '../../components/CardItem';
import FilterButton from '../../components/FIlterButton';

export default function Foods() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.apiReducer);
  const { apiResult, isRedirecting } = data;
  useEffect(() => {
    if (!isRedirecting) dispatch(fetchFoodsOrDrinks('Foods'));
  }, [dispatch, isRedirecting]);
  return (
    <div>
      <Header title="Foods" />
      <FilterButton type="Foods" />
      {apiResult.length ? apiResult.map(({ strMeal, strMealThumb, idMeal }, index) => (
        <Link key={ index } to={ `/foods/${idMeal}` }>
          <CardItem
            index={ index }
            srcImg={ strMealThumb }
            name={ strMeal }
          />
        </Link>)) : null}
      <Footer />
    </div>
  );
}
