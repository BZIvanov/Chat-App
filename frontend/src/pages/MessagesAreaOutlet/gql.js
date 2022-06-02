import { gql } from '@apollo/client';

export const GET_MESSAGES = gql`
  query UserMessages($receiverId: Int!) {
    userMessages(receiverId: $receiverId) {
      id
      text
      createdAt
      receiverId
      senderId
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($receiverId: Int!, $text: String!) {
    sendMessage(receiverId: $receiverId, text: $text) {
      id
      text
      createdAt
      receiverId
      senderId
    }
  }
`;

export const GET_MESSAGES_SUB = gql`
  subscription PostMessage {
    postMessage {
      id
      text
      createdAt
      receiverId
      senderId
    }
  }
`;
