import { gql } from '@apollo/client';

export const SIGNUP_USER = gql`
  mutation Signup($formData: UserSignupInput!) {
    signup(formData: $formData) {
      token
    }
  }
`;
