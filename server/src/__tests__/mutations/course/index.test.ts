/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { COURSES_DATA, STUDENT_DATA } from '../../test_data';
import { createTestServer } from '../../helpers';
import { TEST_REGISTER_COURSE, TEST_UNREGISTER_COURSE, TEST_ADD_NEW_STUDENT, TEST_ADD_NEW_COURSE } from '../mutations';

describe('Course Mutation', () => {
  test.only('should add a new course', async () => {
    const { mutate } = createTestServer({
      db: {
        courses: {
          insertOne: jest.fn(() => ({ ops: [COURSES_DATA[0]] })),
          findOne: jest.fn(() => null),
        }
      },
    });

    const res = await mutate({
      mutation: TEST_ADD_NEW_COURSE,
      variables: {
        input:  {
          name: COURSES_DATA[0].name,
          totalSeats: COURSES_DATA[0].totalSeats,
          status: COURSES_DATA[0].status
        },
      },
    });

    expect(res.data.addNewCourse).toHaveProperty('id');
    expect(res.data.addNewCourse).toHaveProperty('name');
    expect(res.data.addNewCourse).toHaveProperty('totalSeats');
    expect(res).toMatchSnapshot();
  })
});
