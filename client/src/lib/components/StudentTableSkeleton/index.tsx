import React from 'react';
import { Layout, Skeleton, Table } from 'antd';
import { Sidebar } from '../Sidebar';
import { BreadCrumbNav } from '../BreadCrumbNav';

const { Content } = Layout;

export const StudentSkeleton = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      className: 'table_column',
      width: 100,
      key: 'name',
      fixed: 'left' as 'left',
    },
    {
      title: 'StudentID',
      dataIndex: 'studentID',
      className: 'table_column',
      width: 100,
      key: 'studentId',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      className: 'table_column',
      width: 100,
      key: 'email',
    },
    {
      title: 'Date Of Birth',
      dataIndex: 'dob',
      className: 'table_column',
      width: 100,
      key: 'dob',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      className: 'table_column',
      width: 100,
      key: 'country',
    },
    {
      title: 'View',
      dataIndex: 'view',
      className: 'table_column',
      width: 100,
      key: 'view',
    },
  ];

  const data = [
    {
      key: '1',
      name: <Skeleton paragraph={{ rows: 0 }} />,
      studentID: <Skeleton paragraph={{ rows: 0 }} />,
      email: <Skeleton paragraph={{ rows: 0 }} />,
      dob: <Skeleton paragraph={{ rows: 0 }} />,
      country: <Skeleton paragraph={{ rows: 0 }} />,
      view: <Skeleton paragraph={{ rows: 0 }} />,
    },
    {
      key: '2',
      name: <Skeleton paragraph={{ rows: 0 }} />,
      studentID: <Skeleton paragraph={{ rows: 0 }} />,
      email: <Skeleton paragraph={{ rows: 0 }} />,
      dob: <Skeleton paragraph={{ rows: 0 }} />,
      country: <Skeleton paragraph={{ rows: 0 }} />,
      view: <Skeleton paragraph={{ rows: 0 }} />,
    },
    {
      key: '3',
      name: <Skeleton paragraph={{ rows: 0 }} />,
      studentID: <Skeleton paragraph={{ rows: 0 }} />,
      email: <Skeleton paragraph={{ rows: 0 }} />,
      dob: <Skeleton paragraph={{ rows: 0 }} />,
      country: <Skeleton paragraph={{ rows: 0 }} />,
      view: <Skeleton paragraph={{ rows: 0 }} />,
    },
    {
      key: '4',
      name: <Skeleton paragraph={{ rows: 0 }} />,
      studentID: <Skeleton paragraph={{ rows: 0 }} />,
      email: <Skeleton paragraph={{ rows: 0 }} />,
      dob: <Skeleton paragraph={{ rows: 0 }} />,
      country: <Skeleton paragraph={{ rows: 0 }} />,
      view: <Skeleton paragraph={{ rows: 0 }} />,
    },
    {
      key: '5',
      name: <Skeleton paragraph={{ rows: 0 }} />,
      studentID: <Skeleton paragraph={{ rows: 0 }} />,
      email: <Skeleton paragraph={{ rows: 0 }} />,
      dob: <Skeleton paragraph={{ rows: 0 }} />,
      country: <Skeleton paragraph={{ rows: 0 }} />,
      view: <Skeleton paragraph={{ rows: 0 }} />,
    },
  ];
  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Content style={{ padding: '0 50px' }}>
          <BreadCrumbNav paths={['Home', 'All_Students']} />
          <Table
            columns={columns}
            pagination={false}
            dataSource={data}
            rowClassName="table_row"
            scroll={{ x: '50vw' }}
            title={() => (
              <Skeleton
                paragraph={{ rows: 0 }}
                className="user_listing_skeleton"
              />
            )}
          />

          {/* <Skeleton paragraph={{ rows: 5 }} className="user_listing_skeleton" /> */}
        </Content>
      </Layout>
    </Layout>
  );
};
