import React from 'react';
import { Layout } from 'antd';
import { MenuItems } from './components/MenuItems';
import { Link } from 'react-router-dom';

const { Header } = Layout;

export const AppHeader = () => {
  return (
    <Header className="app_header">
      <Link to="/">
          <div className="app_header_logo">
            <h1 className="app_header_logo">School Admin</h1>
        </div>
      </Link>
      <div className="menu_items">
        <MenuItems />
      </div>
    </Header>
  );
};
