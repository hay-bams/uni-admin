/* eslint-disable jest/no-mocks-import */
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { createMemoryHistory } from 'history';
import { NotFound } from '../../pages';
import {  Router } from 'react-router-dom';

const history = createMemoryHistory({
  initialEntries: ['/not-found'],
});

describe('Not Found', () => {
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

  test('should render the not found page', async () => {
    const { queryByText } = render(
      <MockedProvider mocks={[]} addTypename={false}>
      <Router history={history}>
        <NotFound />
      </Router>
    </MockedProvider> 
    );

    await waitFor(() => {
      expect(queryByText('Go to Home')).not.toBe(null);
    });
  });
});
