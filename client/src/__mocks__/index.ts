import { GraphQLError } from 'graphql';
import {
  ADD_NEW_STUDENT,
  All_COURSES,
  LOG_IN,
  LOG_OUT,
  REGISTER_ADMIN,
  REGISTER_COURSE,
  STUDENTS,
  STUDENT_DETAILS,
} from '../graphql';
import { ADD_NEW_COURSE } from '../graphql/mutations/AddNewCourse';
import { UPDATE_COURSE } from '../graphql/mutations/UpdateCourse';

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

export const mockValidStudentCourseRegistraton = {
  request: {
    query: REGISTER_COURSE,
    variables: {
      id: '123',
    },
  },
  result: {
    data: {
      registerCourse: {
        id: '123',
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
        username: 'bams',
        password: 'password',
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
        token: 'wwksksk',
      },
    },
  },
};

export const mockErroredLoginMutation = {
  request: {
    query: LOG_IN,
    variables: {
      input: {
        username: 'bams',
        password: 'password',
        withCookie: false,
      },
    },
  },
 error: new Error('Some error occured')
};

export const mockValidRegisternMutation = {
  request: {
    query: REGISTER_ADMIN,
    variables: {
      input: {
        username: 'bams',
        password: 'password',
      },
    },
  },
  result: {
    data: {
      register: {
        id: '2',
        username: 'admin',
        madeRequest: true,
      },
    },
  },
};

export const mockAddStudentMutation = {
  request: {
    query: ADD_NEW_STUDENT,
    variables: {
      input: {
        name: 'John Doe',
        email: 'john@gmail.com',
        country: 'Nigeria',
      },
    },
  },
  result: {
    data: {
      addNewStudent: {
        id: '2',
        name: 'John Doe',
        email: 'john@gmail.com',
        country: 'Nigeria',
      },
    },
  },
};

export const mockValidCourseQuery = {
  request: {
    query: All_COURSES,
    variables: {
      all: 'all',
      limit: 1,
      page: 1,
    },
  },
  result: {
    data: {
      courses: {
        total: 2,
        results: [
          {
            id: '1234',
            name: '5678',
            totalSeats: '93',
            status: 'active',
          },
        ],
      },
    },
  },
};

export const mockErroredCourseQuery = {
  request: {
    query: All_COURSES,
    variables: {
      all: 'all',
      limit: 1,
      page: 1,
    },
  },
  error: new Error('Some error occured'),
};

export const mockLogoutQuery = {
  request: {
    query: LOG_OUT,
  },
  result: {
    data: {
      logout: {
        id: null,
        username: null,
        token: null,
        madeRequest: false,
      },
    },
  },
};

export const mockInvalidLogoutQuery = {
  request: {
    query: LOG_OUT,
  },
  error: new Error('Some error occured'),
};

export const mockAddCourseMutation = {
  request: {
    query: ADD_NEW_COURSE,
    variables: {
      input: {
        name: 'Chemistry',
        totalSeats: 200,
        status: 'active',
      },
    },
  },
  result: {
    data: {
      addNewCourse: {
        id: '2',
      },
    },
  },
};

export const mockUpdateCourseMutation = {
  request: {
    query: UPDATE_COURSE,
    variables: {
      input: {
        name: 'Chemistry',
        totalSeats: 200,
        status: 'active',
      },
    },
  },
  result: {
    data: {
      updateCourse: {
        id: '2',
      },
    },
  },
};
