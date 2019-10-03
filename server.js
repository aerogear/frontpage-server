import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import schema from './data/schema';
import { createServer } from 'http';

const GRAPHQL_PORT = 8080;

const app = express();

app.use(cors());

const server = new ApolloServer({
  schema
});

server.applyMiddleware({
  app,
  path: '/graphql',
});

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(GRAPHQL_PORT, () => 
  console.log(
  `GraphQL Server is now running on http://localhost:${GRAPHQL_PORT}/graphql`));
