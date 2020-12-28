import { gql } from '@apollo/client';

export const All_COURSES = gql`
  query AllCourses($all: String, $page: Int, $limit: Int) {
    allCourses(all: $all, page: $page, limit: $limit)  {
     total
     results {
      id
      name
      totalSeats
      status
     }
    }
  }
`;
