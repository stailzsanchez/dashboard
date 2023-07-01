import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import './App.css';
import { client } from './init/client';
import AppRouter from './routing/AppRouter';
import { TokenContext } from './context';
import { HashRouter } from 'react-router-dom';
import { useEffect } from 'react';

const App = () => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token')
  );

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <ApolloProvider client={client}>
        <HashRouter>
          <div className="App">
            <AppRouter />
          </div>
        </HashRouter>
      </ApolloProvider>
    </TokenContext.Provider>
  );
};
export default App;
