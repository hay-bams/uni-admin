// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

import cookieParser from 'cookie-parser';
import cors from 'cors'
import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './graphql';
import { connectDatabase } from './database';

 
const corsOptions = {
  credentials: true,
  origin: `${process.env.PUBLIC_URL}`,
}

const mount = async (app: Application) => {
  const db = await connectDatabase();
 
  app.use(cors(corsOptions))
  app.use(cookieParser(process.env.SECRET))

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ db, req, res }),
  });
  server.applyMiddleware({ app, path: '/api', cors: false });

  app.listen(process.env.PORT);

  console.log(`[app] : http://localhost:${process.env.PORT}`);
};

mount(express());
