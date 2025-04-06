"use client";

import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../apollo/client';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        {children}
      </ApolloProvider>
    </Provider>
  );
}