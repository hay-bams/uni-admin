import { gql } from "@apollo/client";

export const REGISTER_COURSE = gql`
  mutation RegisterCourse($studentId: String!, $input: ID!) {
    registerCourse(studentId: $studentId, input: $input) {
      id
    }
  }
`;