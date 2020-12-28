/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateCourseInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateCourse
// ====================================================

export interface UpdateCourse_updateCourse {
  __typename: "Course";
  id: string;
  name: string;
  totalSeats: number;
  status: string;
}

export interface UpdateCourse {
  updateCourse: UpdateCourse_updateCourse;
}

export interface UpdateCourseVariables {
  courseId: string;
  input?: UpdateCourseInput | null;
}
