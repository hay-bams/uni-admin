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

  input NewCourseInput {
    name: String!
    totalSeats: Int!
    status: String!
  }

  input LoginInput {
    username: String
    password: String
    withCookie: Boolean!
  }

  input RegisterInput {
    username: String!
    password: String!
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

  type Courses {
    total: Int
    results: [Course!]!
  }

  type Course {
    id: ID!
    name: String!
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
    token: String 
    madeRequest: Boolean
  }

  type Query {
    students(all: String, limit: Int, page: Int): Students!
    studentDetails(id: ID!): Student!
    allCourses(all: String, limit: Int, page: Int): Courses!
  }

  type Mutation {
    registerCourse(studentId: String!, input: ID!): Student
    unregisterCourse(studentId: String!, courseId: String): Student
    login(input: LoginInput): User!
    logout: User!
    register(input: RegisterInput): User!
    addNewStudent(input: NewStudentInput): Student!
    addNewCourse(input: NewCourseInput): Course!
  }
`;
