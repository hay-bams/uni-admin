import { gql } from "@apollo/client";

export  const REGISTER_ADMIN = gql`
  mutation RegisterAdmin($input: RegisterInput) {
    register(input: $input) {
      id
      username
      madeRequest
    }
  }
`