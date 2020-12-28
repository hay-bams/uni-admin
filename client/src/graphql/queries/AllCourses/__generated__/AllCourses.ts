/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AllCourses
// ====================================================

export interface AllCourses_allCourses_results {
  __typename: "Course";
  id: string;
  name: string;
  totalSeats: number;
  status: string;
}

export interface AllCourses_allCourses {
  __typename: "Courses";
  total: number | null;
  results: AllCourses_allCourses_results[];
}

export interface AllCourses {
  allCourses: AllCourses_allCourses;
}

export interface AllCoursesVariables {
  all?: string | null;
  page?: number | null;
  limit?: number | null;
}
