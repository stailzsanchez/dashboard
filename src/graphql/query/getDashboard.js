import { gql } from '@apollo/client';

export const GET_DASHBOARD = gql`
  query {
    dashboard {
      scenarios {
        active
        inactive
        completed
      }
      lists {
        active
        inactive
        completed
      }
      dialogs {
        active
        inactive
        completed
      }
    }
  }
`;
