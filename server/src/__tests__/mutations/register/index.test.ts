/* eslint-disable @typescript-eslint/no-non-null-assertion */
import bcrypt from 'bcryptjs';

import { USER_DATA } from '../../test_data';
import { createTestServer } from '../../helpers';
import { TEST_REGISTER } from '../mutations';
import { cookie } from '../../../utils/cookieHelper';

jest.mock('bcryptjs');
const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;
const bcryptCompare = mockedBcrypt.compare;

beforeEach(() => {
  bcryptCompare.mockReset();
});

describe('Admin Register Mutation', () => {
  test('should register admin', async () => {
    const { mutate } = createTestServer({
      db: {
        users: {
          insertOne: jest.fn(() => ({ ops: [USER_DATA[0]] })),
          findOne: jest.fn(() => null),
        },
      },
    });

    jest.spyOn(bcrypt, 'compare').mockImplementation(jest.fn(() => true));
    jest.spyOn(cookie, 'setCookie').mockImplementation(jest.fn());

    const res = await mutate({
      mutation: TEST_REGISTER,
      variables: {
        input: {
          username: 'haybams',
          password: 'password',
        },
      },
    });

    expect(res.data.register).toHaveProperty('id');
    expect(res.data.register).toHaveProperty('username');
    expect(res).toMatchSnapshot();
  });

  test('should throw an error if user already exists', async () => {
    const { mutate } = createTestServer({
      db: {
        users: {
          findOne: jest.fn(() => USER_DATA[0]),
        },
      },
    });

    jest.spyOn(bcrypt, 'compare').mockImplementation(jest.fn(() => true));
    jest.spyOn(cookie, 'setCookie').mockImplementation(jest.fn());

    const res = await mutate({
      mutation: TEST_REGISTER,
      variables: {
        input: {
          username: 'haybams',
          password: 'password',
        },
      },
    });

    expect(res.errors?.length).toBeGreaterThan(0);
    expect(res.errors![0]).toHaveProperty('message');
    expect(res).toMatchSnapshot();
  });
});
