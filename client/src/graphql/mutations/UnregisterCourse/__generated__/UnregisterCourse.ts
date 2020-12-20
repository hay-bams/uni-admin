/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UnregisterCourse
// ====================================================

export interface UnregisterCourse_unregisterCourse {
  __typename: "Student";
  id: string;
}

export interface UnregisterCourse {
  unregisterCourse: UnregisterCourse_unregisterCourse | null;
}

export interface UnregisterCourseVariables {
  studentId: string;
  courseId: string;
}
