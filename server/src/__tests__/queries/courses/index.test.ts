import jwt from 'jsonwebtoken';
import { COURSES_DATA, USER_DATA } from '../../test_data';
import { createTestServer } from '../../helpers';
import { TEST_All_COURSES_QUERY } from '../queries';

describe('Courses Queries', () => {
  test('should return all courses', async () => {
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

    expect(res.data.allCourses.length).toBe(COURSES_DATA.length);
    expect(res.data.allCourses[0]).toHaveProperty('id');
    expect(res).toMatchSnapshot();
  });
});
