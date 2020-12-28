import { Course } from "../../../lib/types";

export interface CourseInfo {
  name: string;
  totalSeats: number;
  status: string;
}

export interface NewCourseArgs {
  input: CourseInfo;
}
export interface CoursesData {
  total: number;
  results: Course[];
}

export interface CoursesArgs {
  all: string;
  page: number;
  limit: number;
}

export interface UpdateCourseArgs {
  courseId: string;
  input: CourseInfo
}
