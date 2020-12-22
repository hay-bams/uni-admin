/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoginInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login {
  __typename: "User";
  id: string | null;
  username: string | null;
  madeRequest: boolean | null;
}

export interface Login {
  login: Login_login;
}

export interface LoginVariables {
  input?: LoginInput | null;
}
