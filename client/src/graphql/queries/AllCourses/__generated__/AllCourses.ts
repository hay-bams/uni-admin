/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllCourses
// ====================================================

export interface AllCourses_allCourses {
  __typename: "Course";
  id: string;
  name: string;
  category: string;
  totalSeats: number;
  status: string;
}

export interface AllCourses {
  allCourses: AllCourses_allCourses[];
}
