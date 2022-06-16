import { useMutation } from '@apollo/client';
import { SIGN_IN } from '../../graphql/mutations/signIn';
import { useState } from 'react';
import { useTokenContext } from '../../context/index';

export const useSignIn = () => {
  const { setToken } = useTokenContext();
  const [error, setError] = useState('');

  const [signInGQL, { loading }] = useMutation(SIGN_IN, {
    onCompleted: ({ login }) => {
      setToken(login?.token);
      localStorage.setItem('token', login?.token);
    },
    onError: (e) => {
      setError(e.message);
    },
  });

  const signIn = (login: string, password: string) => {
    signInGQL({
      variables: {
        username: login,
        password: password,
      },
    });
  };

  return {
    signIn,
    loading,
    error,
  };
};
