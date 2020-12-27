import { gql } from "@apollo/client";

export  const ADD_NEW_STUDENT = gql`
  mutation AddNewStudent($input: NewStudentInput) {
    addNewStudent(input: $input) {
      id
    }
  }
`