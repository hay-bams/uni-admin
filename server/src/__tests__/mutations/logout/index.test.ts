import { createTestServer } from '../../helpers';
import { TEST_LOG_OUT } from '../mutations';

describe('Admin Logout Mutation', () => {
  test('should logout admin', async () => {
    const { mutate } = createTestServer({
      res: {clearCookie: jest.fn()}
    });

    const res = await mutate({
      mutation: TEST_LOG_OUT,
    });

    expect(res.data.logout).toHaveProperty('id');  
  });     
});
