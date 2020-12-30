/* eslint-disable jest/no-mocks-import */
import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createMemoryHistory } from 'history';
import { UpdateCourse } from '../../pages';
import { Route, Router } from 'react-router-dom';
import { mockUpdateCourseMutation } from '../../__mocks__';

const history = createMemoryHistory({
  initialEntries: ['/courses/1'],
});

describe('Update Course', () => {
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

  test('should render the update new course page', async () => {
    const admin = { id: '1', username: 'ggg', madeRequest: true, token: '' };

    const { queryByText } = render(
      <MockedProvider mocks={[]}>
        <Router history={history}>
          <Route
            path="/courses/:id"
            render={(props) => <UpdateCourse {...props} admin={admin} />}
          />
        </Router>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(queryByText('Update Course Form')).not.toBe(null);
    });
  });
});
