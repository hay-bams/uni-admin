/* eslint-disable @typescript-eslint/no-non-null-assertion */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

import { USER_DATA } from '../../test_data';
import { createTestServer } from '../../helpers';
import { TEST_LOG_IN } from '../mutations';
import { cookie } from '../../../utils/cookieHelper';

describe('Admin Login Mutation', () => {
  test('should login admin', async () => {
    const { mutate } = createTestServer({
      db: {
        users: {
          findOne: jest.fn(() => USER_DATA[0]),
        },
      },
    });

    jest.spyOn(bcrypt, 'compare').mockImplementation(jest.fn(() => true));
    jest.spyOn(jwt, 'sign').mockImplementation(jest.fn(() => 'kkdj'));
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
    jest.spyOn(jwt, 'sign').mockImplementation(jest.fn(() => 'kkdj'));

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
    expect(res.errors![0]).toHaveProperty('message');
    expect(res).toMatchSnapshot();
  });

  test('should throw an if pasword is wrong', async () => {
    const { mutate } = createTestServer({
      db: {
        users: {
          findOne: jest.fn(() => USER_DATA[0].username),
        },
      },
    });

    jest.spyOn(bcrypt, 'compare').mockImplementation(jest.fn(() => false));

    const res = await mutate({
      mutation: TEST_LOG_IN,
      variables: {
        input: {
          username: 'haybams',
          password: 'wrongPassword',
          withCookie: false,
        },
      },
    });

    expect(res.errors?.length).toBeGreaterThan(0);
    expect(res.errors![0]).toHaveProperty('message');
    expect(res).toMatchSnapshot();
  });
});
