/* eslint-disable jest/no-mocks-import */
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createMemoryHistory } from 'history';
import { NewStudent } from '../../pages';
import { Route, Router } from 'react-router-dom';

const history = createMemoryHistory({
  initialEntries: ['/new-student'],
});

describe('New Student', () => {
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

  test('should render the add new student page', async () => {
    const { queryByText, queryByPlaceholderText } = render(
      <MockedProvider mocks={[]}>
        <Router history={history}>
          <Route path="/new-student" component={NewStudent} />
        </Router>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(queryByText('New Students Form')).not.toBe(null);
      expect(queryByPlaceholderText('John Doe')).not.toBe(null);
    });
  });
});
