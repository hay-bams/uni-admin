import { gql } from 'apollo-server-express';

export const TEST_ALL_STUDENTS_QUERY = gql`
  query TestAllStudentsQuery($all: String, $page: Int, $limit: Int) {
    students(all: $all, page: $page, limit: $limit) {
      total
      results {
        id
      }
    }
  }
`;

export const TEST_STUDENT_DETAILS_QUERY = gql`
  query TestStudentDetailsQuery($id: ID!) {
    studentDetails(id: $id) {
      id
      name
      courses {
        id
      }
    }
  }
`;

export const TEST_All_COURSES_QUERY = gql`
  query AllCourses {
    allCourses {
      total
      results {
        id
      }
    }
  }
`;

export const TEST_SINGLE_COURSE_QUERY = gql`
  query CourseDetails($courseId: ID!) {
    courseDetails(courseId: $courseId) {
      id
      name
    }
  }
`;



