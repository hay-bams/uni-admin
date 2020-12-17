import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Student {
    id: ID!
    studentID: String!
    dob: String!
    status: String!
    name: String!
    email: String!
    country: String!
    avatar: String
  }

  type Students {
    total: Int
    results: [Student!]!
  }

  type Query {
    students(all: String, limit: Int, page: Int): Students!
  }
`;
