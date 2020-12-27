export interface registerCourseArgs {
  studentId: string,
  input: string
}

export interface unregisterCourseArgs {
  studentId: string,
  courseId: string
}

export interface NewStudentInfo  {
  email: string,
  country: string, 
  name: string
}

export interface NewStudentArgs {
  input: NewStudentInfo
}