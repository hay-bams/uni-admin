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
    courses: [Course!]!
  }

  type Students {
    total: Int
    results: [Student!]!
  }

  type Course {
    id: ID!
    name: String!
    category: String!
    totalSeats: Int!
    status: String!
  }

  type StudentData {
    student: Student!
    courses: [Course!]!
  }

  input CourseInput {
    courseId: ID!
  }

  type Query {
    students(all: String, limit: Int, page: Int): Students!
    studentDetails(id: ID!): Student!
    allCourses: [Course!]!
  }

  type Mutation {
    registerCourse(studentId: String!, input: ID!): Student
    unregisterCourse(studentId: String!, courseId: String): Student
  }
`;
