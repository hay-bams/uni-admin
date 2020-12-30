/* eslint-disable jest/no-mocks-import */
import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createMemoryHistory } from 'history';
import { NewCourse, NewStudent } from '../../pages';
import { Route, Router } from 'react-router-dom';
import {
  mockAddStudentMutation,
  mockValidStudentQuery,
  mockAddCourseMutation,
} from '../../__mocks__';

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
    const admin = { id: '1', username: 'admin', madeRequest: true, token: '' };
    const { queryByText, queryByPlaceholderText } = render(
      <MockedProvider mocks={[]}>
        <Router history={history}>
          <Route
            path="/new-student"
            render={(props) => <NewStudent admin={admin} />}
          />
        </Router>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(queryByText('New Students Form')).not.toBe(null);
      expect(queryByPlaceholderText('John Doe')).not.toBe(null);
    });
  });

  test('should redirect if student is added course successfully', async () => {
    const admin = { id: '1', username: 'ggg', madeRequest: true, token: '' };

    const { queryByText, queryByPlaceholderText } = render(
      <MockedProvider
        mocks={[mockAddStudentMutation, mockValidStudentQuery]}
        addTypename={false}
      >
        <Router history={history}>
          <Route
            path="/new-student"
            render={(props) => <NewStudent {...props} admin={admin} />}
          />
        </Router>
      </MockedProvider>
    );

    const name = queryByPlaceholderText('John Doe') as HTMLInputElement;
    const email = queryByPlaceholderText(
      'JohnDoe@gmail.com'
    ) as HTMLInputElement;
    const country = queryByPlaceholderText('Ethopia') as HTMLInputElement;
    const submit = queryByText('Submit') as HTMLInputElement;

    fireEvent.change(name, {
      target: {
        value: mockAddStudentMutation.request.variables.input.name,
      },
    });

    fireEvent.change(email, {
      target: {
        value: mockAddStudentMutation.request.variables.input.email,
      },
    });

    fireEvent.change(country, {
      target: {
        value: mockAddStudentMutation.request.variables.input.country,
      },
    });

    fireEvent.click(submit);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/students');
    });
  });
});
