/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Students
// ====================================================

export interface Students_students_results {
  __typename: "Student";
  id: string;
  studentID: string;
  dob: string;
  status: string;
  name: string;
  email: string;
  country: string;
}

export interface Students_students {
  __typename: "Students";
  total: number | null;
  results: Students_students_results[];
}

export interface Students {
  students: Students_students;
}

export interface StudentsVariables {
  all?: string | null;
  page?: number | null;
  limit?: number | null;
}
