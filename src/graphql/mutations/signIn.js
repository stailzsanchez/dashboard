import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation ($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;
