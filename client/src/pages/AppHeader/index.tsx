import React from 'react';
import { Button, Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { Admin } from '../../lib/types';

interface Props {
  admin: Admin;
  setAdmin: (admin: Admin) => void;
}

const { Header } = Layout;

export const AppHeader = ({ admin, setAdmin }: Props) => {
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
              <Link to="/signin">
                <Button type="primary">Sign Out</Button>
              </Link>
            </Menu.Item>
          </Menu>
        </div>
      ) : null}
    </Header>
  );
};
