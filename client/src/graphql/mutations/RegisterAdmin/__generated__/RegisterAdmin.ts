/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RegisterInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: RegisterAdmin
// ====================================================

export interface RegisterAdmin_register {
  __typename: "User";
  id: string | null;
  username: string | null;
  madeRequest: boolean | null;
}

export interface RegisterAdmin {
  register: RegisterAdmin_register;
}

export interface RegisterAdminVariables {
  input?: RegisterInput | null;
}
