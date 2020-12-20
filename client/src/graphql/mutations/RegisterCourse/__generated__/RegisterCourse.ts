/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegisterCourse
// ====================================================

export interface RegisterCourse_registerCourse {
  __typename: "Student";
  id: string;
}

export interface RegisterCourse {
  registerCourse: RegisterCourse_registerCourse | null;
}

export interface RegisterCourseVariables {
  studentId: string;
  input: string;
}
