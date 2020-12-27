import { gql } from "@apollo/client";

export const STUDENT_DETAILS = gql`
  query studentDetails ($id: ID!) {
    studentDetails(id: $id) {
      id
      name
      courses {
        id
        name
        totalSeats
        status
      }
    }
  }
`;
