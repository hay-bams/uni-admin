import { gql } from 'apollo-server-express';

export const TEST_REGISTER_COURSE = gql`
  mutation TestRegisterCourse($studentId: String!, $input: ID!) {
    registerCourse(studentId: $studentId, input: $input) {
      id
      courses {
        id
        name
      }
    }
  }
`;

export const TEST_UNREGISTER_COURSE = gql`
  mutation TestUnregisterCourse($studentId: String!, $courseId: String!) {
    unregisterCourse(studentId: $studentId, courseId: $courseId) {
      id
      courses {
        id
        name
      }
    }
  }
`;

export const TEST_LOG_IN = gql`
  mutation TestLogin($input: LoginInput) {
    login(input: $input) {
      id
      username
      madeRequest
    }
  }
`;

export const TEST_REGISTER = gql`
  mutation TestRegister($input: RegisterInput) {
    register(input: $input) {
      id
      username
    }
  }
`;

export const TEST_LOG_OUT = gql`
  mutation Testlogout {
    logout {
      id
      username
      madeRequest
    }
  }
`;

export const TEST_ADD_NEW_STUDENT = gql`
  mutation TestAddNewStudent($input: NewStudentInput ) {
    addNewStudent(input: $input) {
      id
      name
      courses {
        id
        name
      }
    }
  }
`;


export const TEST_ADD_NEW_COURSE = gql`
  mutation TestAddNewCourse($input: NewCourseInput ) {
    addNewCourse(input: $input) {
      id
      name
      totalSeats
    }
  }
`;



