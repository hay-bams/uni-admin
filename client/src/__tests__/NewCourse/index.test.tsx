/* eslint-disable jest/no-mocks-import */
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createMemoryHistory } from 'history';
import { NewCourse, NewStudent } from '../../pages';
import { Route, Router } from 'react-router-dom';

const history = createMemoryHistory({
  initialEntries: ['/new-course'],
});

describe('New Course', () => {
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

  test('should render the add new course page', async () => {
    const { queryByText, queryByPlaceholderText } = render(
      <MockedProvider mocks={[]}>
        <Router history={history}>
          <Route path="/new-course" component={NewCourse} />
        </Router>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(queryByText('New Course Form')).not.toBe(null);
      expect(queryByPlaceholderText('Geology')).not.toBe(null);
    });
  });
});
