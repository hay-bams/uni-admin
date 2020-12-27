/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { NewStudentInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: AddNewStudent
// ====================================================

export interface AddNewStudent_addNewStudent {
  __typename: "Student";
  id: string;
}

export interface AddNewStudent {
  addNewStudent: AddNewStudent_addNewStudent;
}

export interface AddNewStudentVariables {
  input?: NewStudentInput | null;
}
