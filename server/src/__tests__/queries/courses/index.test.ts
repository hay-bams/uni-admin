/* eslint-disable @typescript-eslint/no-non-null-assertion */
import jwt from 'jsonwebtoken';
import { COURSES_DATA, USER_DATA } from '../../test_data';
import { createTestServer } from '../../helpers';
import { TEST_All_COURSES_QUERY, TEST_SINGLE_COURSE_QUERY } from '../queries';

describe('Courses Queries', () => {
  test('should return all courses', async () => {
    const { query } = createTestServer({
      db: {
        courses: {
          find: jest.fn(() => ({
            skip: jest.fn(() => ({
              limit: jest.fn(() => ({
                count: jest.fn(() => 4),
                toArray: jest.fn(() => COURSES_DATA),
              })),
            })),
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

    const res = await query({ query: TEST_All_COURSES_QUERY });

    expect(res.data.allCourses.results.length).toBe(COURSES_DATA.length);
    expect(res.data.allCourses.results[0]).toHaveProperty('id');
    expect(res).toMatchSnapshot();
  });

  test('should return a single courses', async () => {
    const { query } = createTestServer({
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

    const res = await query({
      query: TEST_SINGLE_COURSE_QUERY,
      variables: { courseId: COURSES_DATA[0]._id.toString() },
    });

    expect(res.data.courseDetails).toHaveProperty('id');
    expect(res.data.courseDetails).toHaveProperty('name');
    expect(res).toMatchSnapshot();
  });

  test('should throw an error if a single course is not found', async () => {
    const { query } = createTestServer({
      db: {
        courses: {
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

    const res = await query({
      query: TEST_SINGLE_COURSE_QUERY,
      variables: { courseId: COURSES_DATA[0]._id.toString() },
    });

    expect(res.errors?.length).toBeGreaterThan(0);
    expect(res.errors![0]).toHaveProperty('message');
    expect(res).toMatchSnapshot();
  });
});
