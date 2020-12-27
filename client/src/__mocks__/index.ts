import { GraphQLError } from 'graphql';
import { LOG_IN, REGISTER_COURSE, STUDENTS, STUDENT_DETAILS } from '../graphql';

export const mockValidStudentQuery = {
  request: {
    query: STUDENTS,
    variables: {
      all: 'all',
      limit: 1,
      page: 1,
    },
  },
  result: {
    data: {
      students: {
        total: 2,
        results: [
          {
            id: '1234',
            studentID: '5678',
            dob: '93',
            status: 'active',
            name: 'John Doe',
            email: 'johendoe@gmail.com',
            country: 'Nigeria',
          },
        ],
      },
    },
  },
};

export const mockErroredStudentQuery = {
  request: {
    query: STUDENTS,
    variables: {
      all: 'all',
      limit: 1,
      page: 1,
    },
  },
  error: new Error('Some error occured'),
};

export const mockValidStudentDetails = {
  request: {
    query: STUDENT_DETAILS,
    variables: {
      id: '123',
    },
  },
  result: {
    data: {
      studentDetails: {
        id: '123',
        name: 'john doe',
        courses: [
          {
            id: '1',
            name: 'fake course',
            category: 'fake category',
            totalSeats: 3,
            status: 'active',
          },
        ],
      },
    },
  },
};

export const mockValidStudentCourseRegistraton= {
  request: {
    query: REGISTER_COURSE,
    variables: {
      id: '123',
    },
  },
  result: {
    data: {
      registerCourse: {
        id: '123'
      },
    },
  },
};

export const mockErroredStudentDetailsQuery = {
  request: {
    query: STUDENT_DETAILS,
    variables: {
      id: '123',
    },
  },
  error: new Error('Some error occured'),
};

export const mockValidLoginMutation = {
  request: {
    query: LOG_IN,
    variables: {
      input: {
        withCookie: false,
      },
    },
  },
  result: {
    data: {
      login: {
        id: '2',
        username: 'admin',
        madeRequest: true,
      },
    },
  },
};

export const mockInValidLoginMutation = {
  request: {
    query: LOG_IN,
    variables: {
      input: {
        withCookie: false,
      },
    },
  },
  error: new GraphQLError('Some Graphql Error Occured'),
};

// result: jest.fn(() => ({
//   data: {
//     login: {
//       id: '2',
//       username: 'admin',
//       madeRequest: true,
//     },
//   },
// })),