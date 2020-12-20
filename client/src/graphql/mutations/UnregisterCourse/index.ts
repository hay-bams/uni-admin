import { gql } from "@apollo/client";

export const UNREGISTER_COURSE = gql`
  mutation UnregisterCourse($studentId: String!, $courseId: String!) {
    unregisterCourse(studentId: $studentId, courseId: $courseId) {
      id
    }
  }
`