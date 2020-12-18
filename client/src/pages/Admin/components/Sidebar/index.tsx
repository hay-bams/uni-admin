import React, { useState } from 'react';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';

const { Sider } = Layout;

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider
      breakpoint="md"
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      width={260}
      className="admin_side_bar"
    >
      <Menu
        mode="inline"
        theme="dark"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key="1" icon={<UserOutlined />}>
          My Profile
        </Menu.Item>
        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
          nav 2
        </Menu.Item>
        <Menu.Item key="3" icon={<UploadOutlined />}>
          nav 3
        </Menu.Item>
        <Menu.Item key="4" icon={<UserOutlined />}>
          nav 4
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
