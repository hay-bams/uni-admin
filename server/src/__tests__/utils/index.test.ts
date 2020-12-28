/* eslint-disable @typescript-eslint/no-non-null-assertion */
import jwt from 'jsonwebtoken';
import { COURSES_DATA, USER_DATA } from '../test_data';
import { createTestServer } from '../helpers';
import { TEST_All_COURSES_QUERY } from '../queries/queries';

describe('Utils', () => {
  test('should return an error if user is not authenticated', async () => {
    const { query } = createTestServer({
      db: {
        courses: {
          find: jest.fn(() => ({
            count: jest.fn(() => 4),
            toArray: jest.fn(() => COURSES_DATA),
          })),
        },
        users: {
          findOne: jest.fn(() => USER_DATA[0]),
        },
      },
      req: {
        get: jest.fn(() => 'skskkdkdk'),
        signedCookies: {
          admin: '',
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

    expect(res.errors?.length).toBeGreaterThan(0);
    expect(res!.errors![0]).toHaveProperty('message');
    expect(res).toMatchSnapshot();
  });

  test('should return an error if user is not found in the database', async () => {
    const { query } = createTestServer({
      db: {
        courses: {
          find: jest.fn(() => ({
            count: jest.fn(() => 4),
            toArray: jest.fn(() => COURSES_DATA),
          })),
        },
        users: {
          findOne: jest.fn(() => null),
        },
      },
      req: {
        get: jest.fn(() => 'skskkdkdk'),
        signedCookies: {
          admin: USER_DATA[0],
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

    expect(res.errors?.length).toBeGreaterThan(0);
    expect(res!.errors![0]).toHaveProperty('message');
    expect(res).toMatchSnapshot();
  });
});
