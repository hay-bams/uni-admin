/* eslint-disable jest/no-mocks-import */
import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createMemoryHistory } from 'history';
import { Login } from '../../pages';
import { Route, Router } from 'react-router-dom';
import { mockErroredLoginMutation, mockValidLoginMutation } from '../../__mocks__';

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
    const admin = { id: null, username: null, madeRequest: false, token: '' };
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

  test('should redirect to student page on successful login', async () => {
    const admin = { id: null, username: null, madeRequest: false, token: '' };
    const setAdmin = jest.fn();

    const { queryByText, queryByPlaceholderText } = render(
      <MockedProvider mocks={[mockValidLoginMutation]} addTypename={false}>
        <Router history={history}>
          <Route
            path="/login"
            render={(props) => (
              <Login {...props} setAdmin={setAdmin} admin={admin} />
            )}
          />
        </Router>
      </MockedProvider>
    );

    const siginBtn = queryByText('Sign in') as HTMLInputElement;
    const username = queryByPlaceholderText('username') as HTMLInputElement;
    const password = queryByPlaceholderText('password') as HTMLInputElement;

    fireEvent.change(username, {
      target: {
        value: mockValidLoginMutation.request.variables.input.username,
      },
    });
    fireEvent.change(password, {
      target: {
        value: mockValidLoginMutation.request.variables.input.password,
      },
    });
    fireEvent.click(siginBtn);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/students');
    });
  });
});
