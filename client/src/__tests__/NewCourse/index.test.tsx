/* eslint-disable jest/no-mocks-import */
import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createMemoryHistory } from 'history';
import { NewCourse, NewStudent } from '../../pages';
import { Route, Router } from 'react-router-dom';
import { mockAddCourseMutation, mockValidCourseQuery } from '../../__mocks__';

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
    const admin = { id: '1', username: 'ggg', madeRequest: true, token: '' };

    const { queryByText, queryByPlaceholderText } = render(
      <MockedProvider mocks={[]}>
        <Router history={history}>
          <Route
            path="/new-course"
            render={(props) => <NewCourse admin={admin} />}
          />
        </Router>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(queryByText('New Course Form')).not.toBe(null);
      expect(queryByPlaceholderText('Geology')).not.toBe(null);
    });
  });

  test('should redirect if course is added successfully', async () => {
    const admin = { id: '1', username: 'ggg', madeRequest: true, token: '' };

    const { queryByText, queryByPlaceholderText } = render(
      <MockedProvider
        mocks={[mockAddCourseMutation, mockValidCourseQuery]}
        addTypename={false}
      >
        <Router history={history}>
          <Route
            path="/new-course"
            render={(props) => <NewCourse {...props} admin={admin} />}
          />
        </Router>
      </MockedProvider>
    );

    const name = queryByPlaceholderText('Geology') as HTMLInputElement;
    const seats = queryByPlaceholderText('100') as HTMLInputElement;
    const active = queryByText('Active') as HTMLInputElement;
    const submit = queryByText('Submit') as HTMLInputElement;

    fireEvent.change(name, {
      target: {
        value: mockAddCourseMutation.request.variables.input.name,
      },
    });

    fireEvent.change(seats, {
      target: {
        value: mockAddCourseMutation.request.variables.input.totalSeats,
      },
    });

    fireEvent.click(active);
    fireEvent.click(submit);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/courses');
    });
  });
});
