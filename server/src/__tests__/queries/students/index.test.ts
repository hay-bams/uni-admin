/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { COURSES_DATA, STUDENT_DATA } from '../../test_data';
import { createTestServer } from '../../helpers';
import {
  TEST_ALL_STUDENTS_QUERY,
  TEST_STUDENT_DETAILS_QUERY,
} from '../queries';
import { GraphQLError } from 'graphql';

describe('Students Queries', () => {
  test('should return all students', async () => {
    const { query } = createTestServer({
      db: {
        students: {
          find: jest.fn(() => ({
            count: jest.fn(() => 4),
            toArray: jest.fn(() => STUDENT_DATA),
          })),
        },
      },
    });

    const res = await query({
      query: TEST_ALL_STUDENTS_QUERY,
      variables: { all: 'all' },
    });

    expect(res.data.students.total).toBe(STUDENT_DATA.length);
    expect(res.data.students.results.length).toBeGreaterThan(0);
    expect(res.data.students.results[0]).toHaveProperty('id');
    expect(res).toMatchSnapshot();
  });

  test('should return students with pagination', async () => {
    const { query } = createTestServer({
      db: {
        students: {
          find: jest.fn(() => ({
            skip: jest.fn(() => ({
              limit: jest.fn(() => ({
                count: jest.fn(() => 4),
                toArray: jest.fn(() => STUDENT_DATA),
              })),
            })),
          })),
        },
      },
    });

    const res = await query({
      query: TEST_ALL_STUDENTS_QUERY,
      variables: { page: 1, limit: 2 },
    });

    expect(res.data.students.total).toBe(STUDENT_DATA.length);
    expect(res.data.students.results.length).toBeGreaterThan(0);
    expect(res.data.students.results[0]).toHaveProperty('id');
    expect(res).toMatchSnapshot();
  });

  test('should return student details', async () => {
    const { query } = createTestServer({
      db: {
        students: {
          findOne: jest.fn(
            () => new Promise((resolve) => resolve(STUDENT_DATA[0]))
          ),
        },
        courses: {
          find: jest.fn(() => ({
            toArray: jest.fn(() => COURSES_DATA),
          })),
        },
      },
    });

    const res = await query({
      query: TEST_STUDENT_DETAILS_QUERY,
      variables: { id: STUDENT_DATA[0]._id.toString() },
    });

    expect(res.data.studentDetails).toHaveProperty('id');
    expect(res.data.studentDetails).toHaveProperty('name');
    expect(res.data.studentDetails.courses.length).toBeGreaterThan(0);
    expect(res).toMatchSnapshot();
  });

  test('should throw an error if student is not found', async () => {
    const { query } = createTestServer({
      db: {
        students: {
          findOne: jest.fn(() => null),
        },
      },
    });

    const res = await query({
      query: TEST_STUDENT_DETAILS_QUERY,
      variables: { id: STUDENT_DATA[0]._id.toString() },
    });
    expect(res.errors?.length).toBeGreaterThan(0);
    expect(res.errors![0]).toHaveProperty('message');
    expect(res).toMatchSnapshot();
  });

  test('should throw an error if a graphql server error occurs while fetching students', async () => {
    const { query } = createTestServer({
      err: new GraphQLError('Some error occured'),
    });

    const res = await query({
      query: TEST_ALL_STUDENTS_QUERY,
      variables: { all: 'all' },
    });

    expect(res.errors!.length).toBeGreaterThan(0);
  });
});
