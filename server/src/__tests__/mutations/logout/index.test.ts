/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { GraphQLError } from 'graphql';
import { createTestServer } from '../../helpers';
import { TEST_LOG_OUT } from '../mutations';

describe('Admin Logout Mutation', () => {
  test('should logout admin', async () => {
    const { mutate } = createTestServer({
      res: { clearCookie: jest.fn() },
    });

    const res = await mutate({
      mutation: TEST_LOG_OUT,
    });

    expect(res.data.logout).toHaveProperty('id');
  });

  test('should throw an error if a graphql server error occurs on logout', async () => {
    const { mutate } = createTestServer({
      err: new GraphQLError('Some error occured'),
    });

    const res = await mutate({
      mutation: TEST_LOG_OUT,
    });

    expect(res.errors!.length).toBeGreaterThan(0);
  });
});
