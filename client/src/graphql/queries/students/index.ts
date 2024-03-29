import { gql } from '@apollo/client';

export const STUDENTS = gql`
  query Students($all: String, $page: Int, $limit: Int) {
    students(all: $all, page: $page, limit: $limit) {
      total
      results {
        id
        studentID
        status
        name
        email
        country
      }
    }
  }
`;
