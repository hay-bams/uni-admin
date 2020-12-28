import { gql } from "@apollo/client";

export  const LOG_IN = gql`
  mutation Login($input: LoginInput) {
    login(input: $input) {
      id
      username
      token
      madeRequest
    }
  }
`