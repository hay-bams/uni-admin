/* eslint-disable jest/no-mocks-import */
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createMemoryHistory } from 'history';
import { Login } from '../../pages';
import { Route, Router } from 'react-router-dom';

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
});
