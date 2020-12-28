/* eslint-disable @typescript-eslint/no-non-null-assertion */
import jwt from 'jsonwebtoken';
import { COURSES_DATA, USER_DATA } from '../../test_data';
import { createTestServer } from '../../helpers';
import { TEST_ADD_NEW_COURSE, TEST_UPDATE_COURSE } from '../mutations';
import { ObjectID } from 'mongodb';

describe('Course Mutation', () => {
  test('should add a new course', async () => {
    const { mutate } = createTestServer({
      db: {
        courses: {
          insertOne: jest.fn(() => ({ ops: [COURSES_DATA[0]] })),
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
      mutation: TEST_ADD_NEW_COURSE,
      variables: {
        input: {
          name: COURSES_DATA[0].name,
          totalSeats: COURSES_DATA[0].totalSeats,
          status: COURSES_DATA[0].status,
        },
      },
    });

    expect(res.data.addNewCourse).toHaveProperty('id');
    expect(res.data.addNewCourse).toHaveProperty('name');
    expect(res.data.addNewCourse).toHaveProperty('totalSeats');
    expect(res).toMatchSnapshot();
  });

  test('should throw an error if course already exists', async () => {
    const { mutate } = createTestServer({
      db: {
        courses: {
          findOne: jest.fn(() => COURSES_DATA[0]),
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
      mutation: TEST_ADD_NEW_COURSE,
      variables: {
        input: {
          name: COURSES_DATA[0].name,
          totalSeats: COURSES_DATA[0].totalSeats,
          status: COURSES_DATA[0].status,
        },
      },
    });

    expect(res.errors?.length).toBeGreaterThan(0);
    expect(res.errors![0]).toHaveProperty('message');
    expect(res).toMatchSnapshot();
  });

  test('should update a course', async () => {
    const { mutate } = createTestServer({
      db: {
        courses: {
          findOneAndUpdate: jest.fn(() => ({ value: COURSES_DATA[0] })),
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
      mutation: TEST_UPDATE_COURSE,
      variables: {
        courseId: COURSES_DATA[0]._id.toString(),
        input: {
          name: COURSES_DATA[0].name,
          totalSeats: COURSES_DATA[0].totalSeats,
          status: COURSES_DATA[0].status,
        },
      },
    });

    expect(res.data.updateCourse).toHaveProperty('id');
    expect(res.data.updateCourse).toHaveProperty('name');
    expect(res.data.updateCourse).toHaveProperty('totalSeats');
    expect(res).toMatchSnapshot();
  });


  test('should throw an error if course to be updarted is not found', async () => {
    const { mutate } = createTestServer({
      db: {
        courses: {
          findOneAndUpdate: jest.fn(() => (null)),
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
      mutation: TEST_UPDATE_COURSE,
      variables: {
        courseId: COURSES_DATA[0]._id.toString(),
        input: {
          name: COURSES_DATA[0].name,
          totalSeats: COURSES_DATA[0].totalSeats,
          status: COURSES_DATA[0].status,
        },
      },
    });

    expect(res.errors?.length).toBeGreaterThan(0);
    expect(res.errors![0]).toHaveProperty('message');
    expect(res).toMatchSnapshot();
  });
});
