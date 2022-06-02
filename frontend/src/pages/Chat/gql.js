import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query Users {
    users {
      id
      firstName
      lastName
    }
  }
`;

export const GET_USERS_SUB = gql`
  subscription CreateUser {
    createUser {
      id
      firstName
      lastName
      email
    }
  }
`;
