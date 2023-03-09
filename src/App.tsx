import React from 'react';

import Footer from './components/Footer/Footer';

import Header from './components/Header/Header';
import AppRouter from './utils/AppRouter';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <AppRouter />
      <Footer />
    </>
  );
};

export default App;
