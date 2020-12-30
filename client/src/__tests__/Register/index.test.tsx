/* eslint-disable jest/no-mocks-import */
import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createMemoryHistory } from 'history';
import { RegisterAdmin } from '../../pages';
import { Route, Router } from 'react-router-dom';
import { mockValidRegisternMutation } from '../../__mocks__';

const history = createMemoryHistory({
  initialEntries: ['/register'],
});

describe('Register', () => {
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

  test('should render the register page', async () => {
    const admin = { id: null, username: null, madeRequest: false, token: '' };
    const setAdmin = jest.fn();

    const { queryByText, queryByPlaceholderText } = render(
      <MockedProvider mocks={[]}>
        <Router history={history}>
          <Route
            path="/register"
            render={(props) => (
              <RegisterAdmin setAdmin={setAdmin} admin={admin} />
            )}
          />
        </Router>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(queryByText('register')).not.toBe(null);
      expect(queryByPlaceholderText('username')).not.toBe(null);
    });
  });

  test('should redirect to student page on successful registration', async () => {
    const admin = { id: null, username: null, madeRequest: false, token: '' };
    const setAdmin = jest.fn();

    const { queryByText, queryByPlaceholderText } = render(
      <MockedProvider mocks={[mockValidRegisternMutation]} addTypename={false}>
        <Router history={history}>
          <Route
            path="/register"
            render={(props) => (
              <RegisterAdmin {...props} setAdmin={setAdmin} admin={admin} />
            )}
          />
        </Router>
      </MockedProvider>
    );

    const registerBtn = queryByText('register') as HTMLInputElement;
    const username = queryByPlaceholderText('username') as HTMLInputElement;
    const password = queryByPlaceholderText('password') as HTMLInputElement;

    fireEvent.change(username, {
      target: {
        value: mockValidRegisternMutation.request.variables.input.username,
      },
    });
    fireEvent.change(password, {
      target: {
        value: mockValidRegisternMutation.request.variables.input.password,
      },
    });
    fireEvent.click(registerBtn);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/students');
    });
  });
});
