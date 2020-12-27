import { gql } from '@apollo/client';

export const All_COURSES = gql`
  query AllCourses {
    allCourses {
      id
      name
      totalSeats
      status
    }
  }
`;
