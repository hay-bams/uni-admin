import React from 'react';
import { Button, Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { Admin } from '../../lib/types';
import { LOG_OUT } from '../../graphql';
import { Logout as LogoutData } from '../../graphql/mutations/Logout/__generated__/Logout';
import { displayErrorMessage, displaySuccessNotification } from '../../utils';

interface Props {
  admin: Admin;
  setAdmin: (admin: Admin) => void;
}

const { Header } = Layout;

export const AppHeader = ({ admin, setAdmin }: Props) => {
  const location = useLocation();
  const [logout] = useMutation<LogoutData>(LOG_OUT, {
    onCompleted: (data) => {
      if (data && data.logout) {
        setAdmin(data.logout);
        displaySuccessNotification('You have successfully logout');
      }
    },
    onError: () => {
      displayErrorMessage(
        "Sorry! We weren't able to log you out. Please try again later!"
      );
    },
  });

  const handleLogout = () => {
    logout();
  };

  return (
    <Header className="app_header">
      <Link to="/">
        <div className="app_header_logo">
          <h1 className="app_header_logo">School Admin</h1>
        </div>
      </Link>
      {admin.id ? (
        <div className="menu_items">
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            className="app_header_menu"
          >
            <Menu.Item key="7">
              <div onClick={handleLogout}>
                <Button type="primary">Sign Out</Button>
              </div>
            </Menu.Item>
          </Menu>
        </div>
      ) : (
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          className="app_header_menu"
        >
          <Menu.Item key="7">
            <div>
              <Link
                to={
                  location.pathname === '/login'
                    ? '/register'
                    : location.pathname === '/register'
                    ? '/login'
                    : ''
                }
              >
                <Button type="primary">
                  {location.pathname === '/login'
                    ? 'Create New Admin'
                    : location.pathname === '/register'
                    ? 'Sign in'
                    : null}
                </Button>
              </Link>
            </div>
          </Menu.Item>
        </Menu>
      )}

      {}
    </Header>
  );
};
