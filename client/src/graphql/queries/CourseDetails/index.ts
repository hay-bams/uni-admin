import { gql } from '@apollo/client';

export const COURSE_DETAILS = gql`
  query courseDetails($courseId: ID!) {
    courseDetails(courseId: $courseId) {
      id
      name
      status
      totalSeats
    }
  }
`;
