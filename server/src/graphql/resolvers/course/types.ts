export interface CourseInfo {
  name: string;
  totalSeats: number;
  status: string;
}

export interface NewCourseArgs {
  input: CourseInfo;
}
