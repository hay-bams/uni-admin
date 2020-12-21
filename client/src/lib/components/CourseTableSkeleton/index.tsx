import React from 'react';
import { Col, Layout, Row, Skeleton, Table } from 'antd';
import { Sidebar } from '../Sidebar';
import { BreadCrumbNav } from '../BreadCrumbNav';

interface Props {
  turnSidebarOff?: boolean;
}

const { Content } = Layout;

export const CourseTableSkeleton = ({ turnSidebarOff }: Props) => {
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
      title: 'Cateogry',
      dataIndex: 'category',
      className: 'table_column',
      width: 100,
      key: 'category',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      className: 'table_column',
      width: 100,
      key: 'status',
    },
    {
      title: 'Total Seats',
      dataIndex: 'totalSeats',
      className: 'table_column',
      width: 100,
      key: 'totalSeats',
    },
  ];

  const data = [
    {
      key: '1',
      name: <Skeleton paragraph={{ rows: 0 }} />,
      category: <Skeleton paragraph={{ rows: 0 }} />,
      totalSeats: <Skeleton paragraph={{ rows: 0 }} />,
      status: <Skeleton paragraph={{ rows: 0 }} />,
    },
    {
      key: '2',
      name: <Skeleton paragraph={{ rows: 0 }} />,
      category: <Skeleton paragraph={{ rows: 0 }} />,
      totalSeats: <Skeleton paragraph={{ rows: 0 }} />,
      status: <Skeleton paragraph={{ rows: 0 }} />,
    },
    {
      key: '3',
      name: <Skeleton paragraph={{ rows: 0 }} />,
      category: <Skeleton paragraph={{ rows: 0 }} />,
      totalSeats: <Skeleton paragraph={{ rows: 0 }} />,
      status: <Skeleton paragraph={{ rows: 0 }} />,
    },
    {
      key: '4',
      name: <Skeleton paragraph={{ rows: 0 }} />,
      category: <Skeleton paragraph={{ rows: 0 }} />,
      totalSeats: <Skeleton paragraph={{ rows: 0 }} />,
      status: <Skeleton paragraph={{ rows: 0 }} />,
    },
    {
      key: '5',
      name: <Skeleton paragraph={{ rows: 0 }} />,
      category: <Skeleton paragraph={{ rows: 0 }} />,
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
                { title: 'All-Students', link: '/students' },
              ]}
            />
          ) : null}
          <div className="table_container">
            <Skeleton
              paragraph={{ rows: 0 }}
              className="user_listing_skeleton"
            />
            <Row gutter={24} justify="space-between" className="courses">
              <Col xs={24} lg={12} className="registered_courses">
                <Table
                  columns={columns}
                  pagination={false}
                  dataSource={data}
                  rowClassName="table_row"
                  scroll={{ x: '50vw', y: '50vh' }}
                  className="registered_course_table"
                  title={() => (
                    <Skeleton
                      paragraph={{ rows: 0 }}
                      className="user_listing_skeleton"
                    />
                  )}
                />
              </Col>

              <Col xs={24} lg={12}>
                <Table
                  columns={columns}
                  pagination={false}
                  dataSource={data}
                  rowClassName="table_row"
                  scroll={{ x: '50vw', y: '50vh' }}
                  title={() => (
                    <Skeleton
                      paragraph={{ rows: 0 }}
                      className="user_listing_skeleton"
                    />
                  )}
                />
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
