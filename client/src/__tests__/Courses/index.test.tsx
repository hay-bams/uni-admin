/* eslint-disable jest/no-mocks-import */
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createMemoryHistory } from 'history';
import { AllCourses } from '../../pages';
import { Route, Router } from 'react-router-dom';
import {
  mockValidCourseQuery,
  mockErroredCourseQuery,
} from '../../__mocks__';

const history = createMemoryHistory({
  initialEntries: ['/courses'],
});

describe('Courses', () => {
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

  test('should render all courses loading state', async () => {
    const admin = { id: '1', username: null, madeRequest: false, token: '' };
    const { queryByText } = render(
      <MockedProvider mocks={[]}>
        <Router history={history}>
          <Route
            path="/courses"
            render={(props) => <AllCourses {...props} admin={admin} />}
          />
        </Router>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(queryByText('All-Courses-Loading')).not.toBe(null);
      expect(queryByText('All-Courses')).toBe(null);
    });
  });

  test('should render all courses when query is successful', async () => {
    const courseMock = mockValidCourseQuery;
    const admin = { id: '1', username: null, madeRequest: false, token: '' };

    const { queryByText } = render(
      <MockedProvider mocks={[courseMock]} addTypename={false}>
        <Router history={history}>
          <Route
            path="/courses"
            render={(props) => <AllCourses {...props} admin={admin} />}
          />
        </Router>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(queryByText('All-Courses')).not.toBe(null);
      expect(queryByText('All-Courses-Loading')).toBe(null);
    });
  });

  test('should render an error message when the query has an error', async () => {
    const courseMock = mockErroredCourseQuery;

    const errorMessage =
      'Some error occured fetching the courses lists. Please try again soon!';

    const admin = { id: '1', username: null, madeRequest: false, token: '' };

    const { queryByText } = render(
      <MockedProvider mocks={[courseMock]} addTypename={false}>
        <Router history={history}>
          <Route
            path="/courses"
            render={(props) => <AllCourses {...props} admin={admin} />}
          />
        </Router>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(queryByText(errorMessage)).not.toBe(null);
    });
  });

  test('should redirect to login when admin is not authenticated', async () => {
    const courseMock = mockValidCourseQuery;
    const admin = { id: null, username: null, madeRequest: false, token: '' };

    render(
      <MockedProvider mocks={[courseMock]} addTypename={false}>
        <Router history={history}>
          <Route
            path="/courses"
            render={(props) => <AllCourses {...props} admin={admin} />}
          />
        </Router>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(history.location.pathname).toBe('/login');
    });
  });
});
