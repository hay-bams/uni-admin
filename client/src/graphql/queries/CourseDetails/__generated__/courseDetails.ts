/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: courseDetails
// ====================================================

export interface courseDetails_courseDetails {
  __typename: "Course";
  id: string;
  name: string;
  status: string;
  totalSeats: number;
}

export interface courseDetails {
  courseDetails: courseDetails_courseDetails;
}

export interface courseDetailsVariables {
  courseId: string;
}
