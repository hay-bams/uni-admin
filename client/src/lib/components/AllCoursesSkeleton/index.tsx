import React from 'react';
import { Layout, Skeleton, Table } from 'antd';
import { Sidebar } from '../Sidebar';
import { BreadCrumbNav } from '../BreadCrumbNav';

interface Props {
  turnSidebarOff?: boolean;
}

const { Content } = Layout;

export const AllCoursesSkeleton = ({ turnSidebarOff }: Props) => {
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
      title: 'Total Seats',
      dataIndex: 'totalSeats',
      className: 'table_column',
      width: 100,
      key: 'totalSeats',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      className: 'table_column',
      width: 100,
      key: 'status',
    },
  ];

  const data = [
    {
      key: '1',
      name: <Skeleton paragraph={{ rows: 0 }} />,
      totalSeats: <Skeleton paragraph={{ rows: 0 }} />,
      status: <Skeleton paragraph={{ rows: 0 }} />,
    },
    {
      key: '2',
      name: <Skeleton paragraph={{ rows: 0 }} />,
      totalSeats: <Skeleton paragraph={{ rows: 0 }} />,
      status: <Skeleton paragraph={{ rows: 0 }} />,
    },
    {
      key: '3',
      name: <Skeleton paragraph={{ rows: 0 }} />,
      totalSeats: <Skeleton paragraph={{ rows: 0 }} />,
      status: <Skeleton paragraph={{ rows: 0 }} />,
    },
  ];
  return (
    <Layout>
      {!turnSidebarOff ? <Sidebar /> : null}
      <Layout>
        <Content style={{ padding: '0 50px' }}>
          {!turnSidebarOff ? (
            <BreadCrumbNav
              paths={[
                { title: 'Home', link: 'Home' },
                { title: 'All-Courses-Loading', link: '/courses' },
              ]}
            />
          ) : null}
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
