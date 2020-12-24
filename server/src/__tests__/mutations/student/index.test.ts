import { COURSES_DATA, STUDENT_DATA } from '../../test_data';
import { createTestServer } from '../../helpers';
import { TEST_REGISTER_COURSE, TEST_UNREGISTER_COURSE } from '../mutations';

describe('Student Mutation', () => {
  test('should register courses for a student', async () => {
    const { mutate } = createTestServer({
      db: {
        students: {
          findOne: jest.fn(() => STUDENT_DATA[0]),
          findOneAndUpdate: jest.fn(() => ({
            value: STUDENT_DATA[0],
          })),
        },
        courses: {
          find: jest.fn(() => ({
            toArray: jest.fn(() => COURSES_DATA),
          })),
        },
      },
    });

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

  test('should unregister courses for a student', async () => {
    const { mutate } = createTestServer({
      db: {
        students: {
          findOneAndUpdate: jest.fn(() => ({
            value: STUDENT_DATA[0],
          })),
        },
        courses: {
          find: jest.fn(() => ({
            toArray: jest.fn(() => COURSES_DATA),
          })),
        },
      },
    });

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
});
 