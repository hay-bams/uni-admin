/* eslint-disable jest/no-mocks-import */
import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createMemoryHistory } from 'history';
import { Login } from '../../pages';
import { Route, Router } from 'react-router-dom';
import {
  mockValidLoginMutation,
} from '../../__mocks__';

const history = createMemoryHistory({
  initialEntries: ['/login'],
});

describe('Login', () => {
  beforeAll(() => {
    window.matchMedia =
      window.matchMedia ||
      function () {
        return {
          matches: false,
          addListener: function () {},
          removeListener: function () {},
        };
      };
  });

  test('should render the login page', async () => {
    const admin = { id: null, username: null, madeRequest: false };
    const setAdmin = jest.fn();

    const { queryByText, queryByPlaceholderText } = render(
      <MockedProvider mocks={[]}>
        <Router history={history}>
          <Route
            path="/login"
            render={(props) => <Login setAdmin={setAdmin} admin={admin} />}
          />
        </Router>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(queryByText('Sign In')).not.toBe(null);
      expect(queryByPlaceholderText('username')).not.toBe(null);
    });
  });

  test('should login a valid user on signIn button click', async () => {
    const loginMock = mockValidLoginMutation;

    const admin = { id: null, username: null, madeRequest: false };
    const setAdmin = jest.fn();

    const { queryByText } = render(
      <MockedProvider mocks={[loginMock]} addTypename={false}>
        <Router history={history}>
          <Route
            path="/login"
            render={(props) => <Login setAdmin={setAdmin} admin={admin} />}
          />
        </Router>
      </MockedProvider>
    );

    const loginBtn = queryByText('Sign in') as HTMLInputElement;
    fireEvent.click(loginBtn);

    await waitFor(() => {
      expect(queryByText('Logging you in')).not.toBe(null);
    });
  });
});
