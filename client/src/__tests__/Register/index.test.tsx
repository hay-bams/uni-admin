/* eslint-disable jest/no-mocks-import */
import React from 'react';
import {  render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createMemoryHistory } from 'history';
import {  RegisterAdmin } from '../../pages';
import { Route, Router } from 'react-router-dom';

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
            render={(props) => <RegisterAdmin setAdmin={setAdmin} admin={admin} />}
          />
        </Router>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(queryByText('register')).not.toBe(null);
      expect(queryByPlaceholderText('username')).not.toBe(null);
    });
  });
});
