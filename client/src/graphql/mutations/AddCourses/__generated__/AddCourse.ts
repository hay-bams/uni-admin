/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddCourse
// ====================================================

export interface AddCourse_addCourses {
  __typename: "Student";
  id: string;
}

export interface AddCourse {
  addCourses: AddCourse_addCourses | null;
}

export interface AddCourseVariables {
  studentId: string;
  input: string;
}
