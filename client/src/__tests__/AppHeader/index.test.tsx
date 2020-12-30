/* eslint-disable jest/no-mocks-import */
import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createMemoryHistory } from 'history';
import { AllStudents, AppHeader } from '../../pages';
import { Route, Router } from 'react-router-dom';
import {
  mockValidStudentQuery,
  mockLogoutQuery,
} from '../../__mocks__';

const history = createMemoryHistory({
  initialEntries: ['/students'],
});

describe('App Header', () => {
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

  test('should render the App Header Component', async () => {
    const studentsMock = mockValidStudentQuery;
    const admin = { id: '1', username: null, madeRequest: false, token: '' };
    const setAdmin = jest.fn();

    const { queryByText } = render(
      <MockedProvider mocks={[studentsMock]} addTypename={false}>
        <Router history={history}>
          <AppHeader admin={admin} setAdmin={setAdmin}/>
        </Router>
      </MockedProvider>
    );

    await waitFor(() => {
      expect(queryByText('Sign Out')).not.toBe(null);
    });
  });

  test('should call setAdmin hook function when user signout', async () => {
    const mockLogout = mockLogoutQuery;
    const admin = { id: '1', username: null, madeRequest: false, token: '' };
    const setAdmin = jest.fn();

    const { queryByTestId } = render(
      <MockedProvider mocks={[mockLogout]} addTypename={false}>
        <Router history={history}>
          <AppHeader admin={admin} setAdmin={setAdmin}/>
          <Route
            path="/students"
            render={(props) => <AllStudents {...props} admin={admin} />}
          />
        </Router>
      </MockedProvider> 
    );

    const signOutBtn = queryByTestId('signoutBtn') as HTMLInputElement
    fireEvent.click(signOutBtn)

    await waitFor(() => {

      expect(setAdmin).toHaveBeenCalled()
    });
  }); 
});
