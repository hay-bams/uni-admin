import { gql } from "@apollo/client";

export const ADD_COURSES = gql`
  mutation AddCourse($studentId: String!, $input: ID!) {
    addCourses(studentId: $studentId, input: $input) {
      id
    }
  }
`;