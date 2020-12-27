import { gql } from "@apollo/client";

export  const ADD_NEW_COURSE = gql`
  mutation AddNewCourse($input: NewCourseInput) {
    addNewCourse(input: $input) {
      id
    }
  }
`