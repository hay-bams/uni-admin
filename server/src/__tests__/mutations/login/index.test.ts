import bcrypt from 'bcrypt';

import { USER_DATA } from '../../test_data';
import { createTestServer } from '../../helpers';
import { TEST_LOG_IN } from '../mutations';
import { cookie } from '../../../utils/cookieHelper';

jest.mock('bcrypt');
const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;
const bcryptCompare = mockedBcrypt.compare;

beforeEach(() => {
  bcryptCompare.mockReset();
});

describe('Admin Login', () => {
  test('should login admin', async () => {
    const { mutate } = createTestServer({
      db: {
        users: {
          findOne: jest.fn(() => USER_DATA[0]),
        },
      },
    });

    bcryptCompare.mockResolvedValue(true);
    jest.spyOn(cookie, 'setCookie').mockImplementation(jest.fn());

    const res = await mutate({
      mutation: TEST_LOG_IN,
      variables: {
        input: {
          username: 'haybams',
          password: 'password',
          withCookie: false,
        },
      },
    });

    expect(res.data.login).toHaveProperty('id');
    expect(res.data.login).toHaveProperty('username');
    expect(res.data.login).toHaveProperty('madeRequest');
    expect(res.data.login.madeRequest).toBe(true);
    expect(res).toMatchSnapshot();
  });

  test('should login via cookie', async () => {
    const { mutate } = createTestServer({
      db: {
        users: {
          findOne: jest.fn(() => USER_DATA[0]),
        },
      },
    });

    jest.spyOn(cookie, 'loginViaCookie').mockImplementation(jest.fn()); 

    const res = await mutate({
      mutation: TEST_LOG_IN,
      variables: {
        input: {
          username: USER_DATA[0].username,
          password: 'passwordu',
          withCookie: true,
        },
      },
    });

    expect(res.data.login).toHaveProperty('id');
    expect(res.data.login).toHaveProperty('username');
    expect(res.data.login).toHaveProperty('madeRequest');
    expect(res.data.login.madeRequest).toBe(true);
  });

  test('should return an error if user is not found', async () => {
    const { mutate } = createTestServer({
      db: {
        users: {
          findOne: jest.fn(() => null),
        },
      },
    });

    const res = await mutate({
      mutation: TEST_LOG_IN,
      variables: {
        input: {
          username: 'haybams',
          password: 'password',
          withCookie: false,
        },
      },
    });

    expect(res.errors?.length).toBeGreaterThan(0);
    res.errors && expect(res.errors[0]).toHaveProperty('message');
    expect(res).toMatchSnapshot();
  });
});