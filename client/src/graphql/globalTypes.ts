/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface LoginInput {
  username?: string | null;
  password?: string | null;
  withCookie: boolean;
}

export interface NewCourseInput {
  name: string;
  totalSeats: number;
  status: string;
}

export interface NewStudentInput {
  email: string;
  country: string;
  name: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
