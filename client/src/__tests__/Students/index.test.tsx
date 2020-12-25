/* eslint-disable jest/no-mocks-import */
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createMemoryHistory } from 'history';
import { AllStudents } from '../../pages';
import { Route, Router } from 'react-router-dom';
import {
  mockValidStudentQuery,
  mockErroredStudentQuery,
} from '../../__mocks__';

const history = createMemoryHistory({
  initialEntries: ['/students'],
});

describe('Students', () => {
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

  test('should render all students loading state', async () => {
    const admin = { id: '1', username: null, madeRequest: false };
    const { queryByText } = render(
      <MockedProvider mocks={[]}>
        <Router history={history}>
          <Route
            path="/students"
            render={(props) => <AllStudents {...props} admin={admin} />}
          />
        </Router>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(queryByText('All-Students-Loading')).not.toBe(null);
      expect(queryByText('All-Students')).toBe(null);
    });
  });

  test('should render all students when query is successful', async () => {
    const studentsMock = mockValidStudentQuery;
    const admin = { id: '1', username: null, madeRequest: false };

    const { queryByText } = render(
      <MockedProvider mocks={[studentsMock]} addTypename={false}>
        <Router history={history}>
          <Route
            path="/students"
            render={(props) => <AllStudents {...props} admin={admin} />}
          />
        </Router>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(queryByText('All-Students')).not.toBe(null);
      expect(queryByText('All-Students-Loading')).toBe(null);
    });
  });

  test('should render an error message when the query has an error', async () => {
    const studentsMock = mockErroredStudentQuery;

    const errorMessage =
      'Some error occured fetching the student lists. Please try again soon!';

    const admin = { id: '1', username: null, madeRequest: false };

    const { queryByText } = render(
      <MockedProvider mocks={[studentsMock]} addTypename={false}>
        <Router history={history}>
          <Route
            path="/students"
            render={(props) => <AllStudents {...props} admin={admin} />}
          />
        </Router>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(queryByText(errorMessage)).not.toBe(null);
    });
  });

  test('should redirect to  login when admin is not authenticated', async () => {
    const studentsMock = mockValidStudentQuery;
    const admin = { id: null, username: null, madeRequest: false };

    render(
      <MockedProvider mocks={[studentsMock]} addTypename={false}>
        <Router history={history}>
          <Route
            path="/students"
            render={(props) => <AllStudents {...props} admin={admin} />}
          />
        </Router>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(history.location.pathname).toBe('/login');
    });
  });
});
