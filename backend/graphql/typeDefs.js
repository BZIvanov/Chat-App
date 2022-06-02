import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
  }

  type Token {
    token: String!
  }

  input UserSignupInput {
    firstName: String!
    lastName: String
    email: String!
    password: String!
  }

  input UserSigninInput {
    email: String!
    password: String!
  }

  scalar Date

  type Message {
    id: ID!
    text: String!
    createdAt: Date!
    receiverId: Int!
    senderId: Int!
  }

  type Query {
    user: User
    users: [User]
    userMessages(receiverId: Int!): [Message]
  }

  type Mutation {
    signup(formData: UserSignupInput!): Token
    signin(formData: UserSigninInput!): Token
    sendMessage(receiverId: Int!, text: String!): Message
  }

  type Subscription {
    createUser: User
    postMessage: Message
  }
`;

export default typeDefs;
