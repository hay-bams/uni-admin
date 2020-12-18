import React from 'react';
import { Button, Menu } from 'antd';
import { UserOutlined, LogoutOutlined, CarOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

// TODO: some box shadows to the happ header

export const MenuItems = () => {
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={['1']}
      className="app_header_menu"
    >
      <Menu.Item key="6">
        <Link to="/admin">
          <CarOutlined />
          Admin
        </Link>
      </Menu.Item>
      <Menu.Item key="7">
        <Link to="/signin">
          <Button type="primary">Sign In</Button>
        </Link>
      </Menu.Item>

      <SubMenu key="sub1" title={'subMenu'}>
        <Menu.Item key="3">
          <Link to={`/user`}>
            <UserOutlined />
            Profile
          </Link>
        </Menu.Item>

        <Menu.Item key="2">
          <div>
            <LogoutOutlined />
            Logout
          </div>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};
