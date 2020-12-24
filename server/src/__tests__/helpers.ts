import { ApolloServer } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing'

import { typeDefs, resolvers } from '../graphql';


export const createTestServer = (ctx: any) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    mockEntireSchema: false,
    mocks: true,
    context: () => ctx
  });

  return createTestClient(server)
}
