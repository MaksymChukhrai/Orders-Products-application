import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { AnimatePresence } from 'framer-motion';
import { store } from './redux/store';
import apolloClient from './apollo/client';
import TopMenu from './components/TopMenu/TopMenu';
import NavigationMenu from './components/NavigationMenu/NavigationMenu';
import Orders from './components/Orders/Orders';
import Products from './components/Products/Products';
import './styles/globals.scss';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <div className="app-container">
            <TopMenu />
            <div className="content-container">
              <NavigationMenu />
              <main className="main-content">
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={<Navigate to="/orders" replace />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="*" element={<Navigate to="/orders" replace />} />
                  </Routes>
                </AnimatePresence>
              </main>
            </div>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    </Provider>
  );
};

export default App;