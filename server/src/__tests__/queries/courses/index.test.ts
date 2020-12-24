import { COURSES_DATA } from '../../test_data';
import { createTestServer } from '../../helpers';
import { TEST_All_COURSES_QUERY } from '../queries'

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
      },
    });

    const res = await query({ query: TEST_All_COURSES_QUERY });

    expect(res.data.allCourses.length).toBe(COURSES_DATA.length);
    expect(res.data.allCourses[0]).toHaveProperty('id');
    expect(res).toMatchSnapshot(); 
  });
});
