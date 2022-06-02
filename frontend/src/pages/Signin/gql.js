import { gql } from '@apollo/client';

export const SIGNIN_USER = gql`
  mutation Signin($formData: UserSigninInput!) {
    signin(formData: $formData) {
      token
    }
  }
`;
