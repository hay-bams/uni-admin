import React, { useState } from 'react';
import {
  UserOutlined,
  UserAddOutlined,
  BookOutlined,
  FolderAddOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider
      breakpoint="lg"
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
          <Link to="/students">All Students</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<FolderAddOutlined />}>
          <Link to="/courses">All Courses</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UserAddOutlined />} >
          <Link to="/new-student">Add New Student</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<BookOutlined />}>
          <Link to="/new-course">Add New Course</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
