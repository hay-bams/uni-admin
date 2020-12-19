import { gql } from '@apollo/client';

export const STUDENT = gql`
  query Students($all: String, $page: Int, $limit: Int) {
    students(all: $all, page: $page, limit: $limit) {
      total
      results {
        id
        studentID
        dob
        status
        name
        email
        country
      }
    }
  }
`;
