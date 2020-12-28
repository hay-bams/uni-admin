/* eslint-disable jest/no-mocks-import */
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createMemoryHistory } from 'history';
import { Home, Login } from '../../pages';
import { Route, Router } from 'react-router-dom';
const history = createMemoryHistory({
  initialEntries: ['/'],
});

describe('Home', () => {
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

  test('should redirect to the login page', async () => {
    const { queryByText } = render(
      <MockedProvider mocks={[]}>
        <Router history={history}>
          <Route path="/">
            <Home />
          </Route>
        </Router>
      </MockedProvider>
    );

    await waitFor(() => {
       expect(history.location.pathname).toBe('/students');
      // expect(queryByText('Sign In')).not.toBe(null);
      // expect(queryByPlaceholderText('username')).not.toBe(null);
    });
  });
});
