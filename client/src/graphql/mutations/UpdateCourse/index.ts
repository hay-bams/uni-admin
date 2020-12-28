import { gql } from "@apollo/client";

export  const UPDATE_COURSE = gql`
  mutation UpdateCourse($courseId: ID!, $input: UpdateCourseInput) {
    updateCourse(courseId: $courseId, input: $input) {
      id
      name
      totalSeats
      status
    }
  }
`