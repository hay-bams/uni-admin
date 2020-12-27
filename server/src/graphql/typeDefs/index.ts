import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  input CourseInput {
    courseId: ID!
  }

  input NewStudentInput {
    email: String!,
    country: String!, 
    name: String!
  }

  input LoginInput {
    username: String
    password: String
    withCookie: Boolean!
  }

  type Student {
    id: ID!
    studentID: String!
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

  type User {
    id: ID
    username: String
    madeRequest: Boolean
  }

  type Query {
    students(all: String, limit: Int, page: Int): Students!
    studentDetails(id: ID!): Student!
    allCourses: [Course!]!
  }

  type Mutation {
    registerCourse(studentId: String!, input: ID!): Student
    unregisterCourse(studentId: String!, courseId: String): Student
    login(input: LoginInput): User!
    logout: User!
    addNewStudent(input: NewStudentInput): Student!
  }
`;
