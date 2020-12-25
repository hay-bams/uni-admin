/* eslint-disable jest/no-mocks-import */
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createMemoryHistory } from 'history';
import { StudentDetails } from '../../pages';
import { Route, Router } from 'react-router-dom';
import {
  mockErroredStudentDetailsQuery,
  mockValidStudentDetails,
} from '../../__mocks__';

const history = createMemoryHistory({
  initialEntries: ['/students/123'],
});

describe('Student Details', () => {
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

  test('should render student details loading state', async () => {
    const admin = { id: '1', username: null, madeRequest: false };

    const { queryByText } = render(
      <MockedProvider mocks={[]}>
        <Router history={history}>
          <Route
            path="/students"
            render={(props) => <StudentDetails {...props} admin={admin} />}
          />
        </Router>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(queryByText('Student-Details')).toBe(null);
      expect(queryByText('All-Students-Loading')).not.toBe(null);
    });
  });

  test('should render student details when query is successful', async () => {
    const studentDetailsMock = mockValidStudentDetails;
    const admin = { id: '1', username: null, madeRequest: false };

    const { queryByText } = render(
      <MockedProvider mocks={[studentDetailsMock]}>
        <Router history={history}>
          <Route
            path="/students"
            render={(props) => <StudentDetails {...props} admin={admin} />}
          />
        </Router>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(queryByText('Student-Details')).not.toBe(null);
      expect(queryByText('All-Students-Loading')).toBe(null);
    });
  });

  test('should render an error message when the query has an error', async () => {
    const studentsDetailsMock = mockErroredStudentDetailsQuery;
    const errorMessage =
      'Some error occured fetching the student details. Please try again soon!';

    const admin = { id: '1', username: null, madeRequest: false };
    const { queryByText } = render(
      <MockedProvider mocks={[studentsDetailsMock]} addTypename={false}>
        <Router history={history}>
          <Route
            path="/students"
            render={(props) => <StudentDetails {...props} admin={admin} />}
          />
        </Router>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(queryByText(errorMessage)).not.toBe(null);
    });
  });

  test('should redirect to login when admin is not authenticated', async () => {
    const studentsDetailsMock = mockErroredStudentDetailsQuery;
    const admin = { id: null, username: null, madeRequest: false };

    render(
      <MockedProvider mocks={[studentsDetailsMock]} addTypename={false}>
        <Router history={history}>
          <Route
            path="/students"
            render={(props) => <StudentDetails {...props} admin={admin} />}
          />
        </Router>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(history.location.pathname).toBe('/login');
    });
  });
});
