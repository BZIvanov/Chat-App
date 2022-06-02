import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import jwt from 'jsonwebtoken';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers.js';
import { GRAPHQL_PATH } from './constants/index.js';

const app = express();

const schema = makeExecutableSchema({ typeDefs, resolvers });

const apolloServer = new ApolloServer({
  schema,
  // context is similar ot middleware which will run before the query and mutations and with the context we can provide additional data to the queries and mutations
  context: ({ req }) => {
    const { authorization } = req.headers;

    if (authorization && authorization.startsWith('Bearer ')) {
      const tokenString = authorization.split(' ')[1];
      return jwt.verify(tokenString, process.env.JWT_SECRET);
    }

    return null;
  },
});

await apolloServer.start();

apolloServer.applyMiddleware({ app, path: GRAPHQL_PATH });

const server = app.listen(process.env.PORT, () => {
  const wsServer = new WebSocketServer({ server, path: GRAPHQL_PATH });

  useServer({ schema }, wsServer);
});
