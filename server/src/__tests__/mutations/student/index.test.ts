/* eslint-disable @typescript-eslint/no-non-null-assertion */
import jwt from 'jsonwebtoken';
import { COURSES_DATA, STUDENT_DATA, USER_DATA } from '../../test_data';
import { createTestServer } from '../../helpers';
import {
  TEST_REGISTER_COURSE,
  TEST_UNREGISTER_COURSE,
  TEST_ADD_NEW_STUDENT,
} from '../mutations';

describe('Student Mutation', () => {
  test('should add new student', async () => {
    const { mutate } = createTestServer({
      db: {
        students: {
          insertOne: jest.fn(() => ({ ops: [STUDENT_DATA[0]] })),
          find: jest.fn(() => ({
            count: jest.fn(() => STUDENT_DATA),
          })),
        },
        users: {
          findOne: jest.fn(() => USER_DATA[0]),
        },
        courses: {
          find: jest.fn(() => ({
            toArray: jest.fn(() => COURSES_DATA),
          })),
        },
      },
      req: {
        get: jest.fn(() => 'skskkdkdk'),
        signedCookies: {
          admin: USER_DATA[0]._id,
        },
      },
      res: {
        clearCookie: jest.fn(),
      },
    });

    jest.spyOn(jwt, 'verify').mockImplementation(
      jest.fn(() => ({
        admin: USER_DATA[0]._id,
      }))
    );

    const res = await mutate({
      mutation: TEST_ADD_NEW_STUDENT,
      variables: {
        input: {
          email: STUDENT_DATA[0].email,
          name: STUDENT_DATA[0].name,
          country: STUDENT_DATA[0].country,
        },
      },
    });

    expect(res.data.addNewStudent).toHaveProperty('id');
    expect(res.data.addNewStudent).toHaveProperty('name');
    expect(res).toMatchSnapshot();
  });

  test('should register courses for a student', async () => {
    const { mutate } = createTestServer({
      db: {
        students: {
          findOne: jest.fn(() => STUDENT_DATA[0]),
          findOneAndUpdate: jest.fn(() => ({
            value: STUDENT_DATA[0],
          })),
        },
        users: {
          findOne: jest.fn(() => USER_DATA[0]),
        },
        courses: {
          find: jest.fn(() => ({
            toArray: jest.fn(() => COURSES_DATA),
          })),
        },
      },
      req: {
        get: jest.fn(() => 'skskkdkdk'),
        signedCookies: {
          admin: USER_DATA[0]._id,
        },
      },
      res: {
        clearCookie: jest.fn(),
      },
    });

    jest.spyOn(jwt, 'verify').mockImplementation(
      jest.fn(() => ({
        admin: USER_DATA[0]._id,
      }))
    );

    const res = await mutate({
      mutation: TEST_REGISTER_COURSE,
      variables: {
        studentId: STUDENT_DATA[0]._id.toString(),
        input: COURSES_DATA[0]._id.toString(),
      },
    });

    expect(res.data.registerCourse).toHaveProperty('id');
    expect(res.data.registerCourse.courses.length).toBeGreaterThan(0);
    expect(res).toMatchSnapshot();
  });

  test('should throw an error if student to be registered does not exist', async () => {
    const { mutate } = createTestServer({
      db: {
        students: {
          findOne: jest.fn(() => null),
        },
        users: {
          findOne: jest.fn(() => USER_DATA[0]),
        },
      },
      req: {
        get: jest.fn(() => 'skskkdkdk'),
        signedCookies: {
          admin: USER_DATA[0]._id,
        },
      },
      res: {
        clearCookie: jest.fn(),
      },
    });

    jest.spyOn(jwt, 'verify').mockImplementation(
      jest.fn(() => ({
        admin: USER_DATA[0]._id,
      }))
    );

    const res = await mutate({
      mutation: TEST_REGISTER_COURSE,
      variables: {
        studentId: STUDENT_DATA[0]._id.toString(),
        input: COURSES_DATA[0]._id.toString(),
      },
    });

    expect(res.errors?.length).toBeGreaterThan(0);
    expect(res.errors![0]).toHaveProperty('message');
    expect(res).toMatchSnapshot();
  });

  test('should throw an error if student course registration failed', async () => {
    const { mutate } = createTestServer({
      db: {
        students: {
          findOne: jest.fn(() => STUDENT_DATA[0]),
          findOneAndUpdate: jest.fn(() => ({
            value: null,
          })),
        },
        users: {
          findOne: jest.fn(() => USER_DATA[0]),
        },
        courses: {
          find: jest.fn(() => ({
            toArray: jest.fn(() => COURSES_DATA),
          })),
        },
      },
      req: {
        get: jest.fn(() => 'skskkdkdk'),
        signedCookies: {
          admin: USER_DATA[0]._id,
        },
      },
      res: {
        clearCookie: jest.fn(),
      },
    });

    jest.spyOn(jwt, 'verify').mockImplementation(
      jest.fn(() => ({
        admin: USER_DATA[0]._id,
      }))
    );

    const res = await mutate({
      mutation: TEST_REGISTER_COURSE,
      variables: {
        studentId: STUDENT_DATA[0]._id.toString(),
        input: COURSES_DATA[0]._id.toString(),
      },
    });

    expect(res.errors?.length).toBeGreaterThan(0);
    expect(res.errors![0]).toHaveProperty('message');
    expect(res).toMatchSnapshot();
  });

  test('should unregister courses for a student', async () => {
    const { mutate } = createTestServer({
      db: {
        students: {
          findOneAndUpdate: jest.fn(() => ({
            value: STUDENT_DATA[0],
          })),
        },
        users: {
          findOne: jest.fn(() => USER_DATA[0]),
        },
        courses: {
          find: jest.fn(() => ({
            toArray: jest.fn(() => COURSES_DATA),
          })),
        },
      },
      req: {
        get: jest.fn(() => 'skskkdkdk'),
        signedCookies: {
          admin: USER_DATA[0]._id,
        },
      },
      res: {
        clearCookie: jest.fn(),
      },
    });

    jest.spyOn(jwt, 'verify').mockImplementation(
      jest.fn(() => ({
        admin: USER_DATA[0]._id,
      }))
    );

    const res = await mutate({
      mutation: TEST_UNREGISTER_COURSE,
      variables: {
        studentId: STUDENT_DATA[0]._id.toString(),
        courseId: COURSES_DATA[0]._id.toString(),
      },
    });

    expect(res.data.unregisterCourse).toHaveProperty('id');
    expect(res.data.unregisterCourse).toHaveProperty('courses');
    expect(res).toMatchSnapshot();
  });

  test('should throw an error if student course removal failed', async () => {
    const { mutate } = createTestServer({
      db: {
        students: {
          findOneAndUpdate: jest.fn(() => ({
            value: null,
          })),
        },
        users: {
          findOne: jest.fn(() => USER_DATA[0]),
        },
      },
      req: {
        get: jest.fn(() => 'skskkdkdk'),
        signedCookies: {
          admin: USER_DATA[0]._id,
        },
      },
      res: {
        clearCookie: jest.fn(),
      },
    });

    jest.spyOn(jwt, 'verify').mockImplementation(
      jest.fn(() => ({
        admin: USER_DATA[0]._id,
      }))
    );

    const res = await mutate({
      mutation: TEST_UNREGISTER_COURSE,
      variables: {
        studentId: STUDENT_DATA[0]._id.toString(),
        courseId: COURSES_DATA[0]._id.toString(),
      },
    });

    expect(res.errors?.length).toBeGreaterThan(0);
    expect(res.errors![0]).toHaveProperty('message');
    expect(res).toMatchSnapshot();
  });
});
