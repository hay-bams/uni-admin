/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { NewCourseInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: AddNewCourse
// ====================================================

export interface AddNewCourse_addNewCourse {
  __typename: "Course";
  id: string;
}

export interface AddNewCourse {
  addNewCourse: AddNewCourse_addNewCourse;
}

export interface AddNewCourseVariables {
  input?: NewCourseInput | null;
}
