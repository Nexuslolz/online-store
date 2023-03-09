import React from 'react';
import { Route, Routes } from 'react-router';

import CartPage from '../pages/CartPage/CartPage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';

import MainPage from '../pages/MainPage/MainPage';
import ProductPage from '../pages/ProductPage/ProductPage';

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/product/:id' element={<ProductPage />} />
      <Route path='*' element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRouter;
