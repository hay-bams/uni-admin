import { gql } from "@apollo/client";

export  const LOG_OUT = gql`
  mutation Logout {
    logout {
      id
      username
      madeRequest
    }
  }
`