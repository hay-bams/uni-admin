/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: studentDetails
// ====================================================

export interface studentDetails_studentDetails_courses {
  __typename: "Course";
  id: string;
  name: string;
  totalSeats: number;
  status: string;
}

export interface studentDetails_studentDetails {
  __typename: "Student";
  id: string;
  name: string;
  courses: studentDetails_studentDetails_courses[];
}

export interface studentDetails {
  studentDetails: studentDetails_studentDetails;
}

export interface studentDetailsVariables {
  id: string;
}
