import { createContext, useContext } from 'react';

export type TokenContextType = {
  token: string | null;
  setToken: (token: string | null) => void;
};

export const TokenContext = createContext<TokenContextType>({
  token: '',
  setToken: () => {},
});

export const useTokenContext = () => useContext(TokenContext);
