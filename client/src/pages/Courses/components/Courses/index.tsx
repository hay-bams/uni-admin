import React from 'react';
import { Button, Table, Tag, Typography } from 'antd';
import {
  AllCourses_allCourses,
  AllCourses_allCourses_results,
} from '../../../../graphql/queries/AllCourses/__generated__/AllCourses';
import { Link } from 'react-router-dom';

interface Props {
  courses: AllCourses_allCourses['results']
}

const { Title, Text } = Typography;

export const Courses = ({ courses }: Props) => {
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
      render: (
        status: string,
        record: AllCourses_allCourses_results,
        index: number
      ) => {
        return (
          <Tag color={status === 'active' ? 'green' : 'red'} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      className: 'table_column',
      width: 100,
      render: (edit: any, record: any, index: any) => {
        return (
            <div data-testid="editbtn">
              <Link to={`/courses/${record.id}`}>
              <Button type="primary">{edit}</Button>
            </Link>
            </div>
        );
      },
    },
  ];

  const data: any =
    courses &&
    courses.map((course: AllCourses_allCourses_results) => ({
      ...course,
      key: `${course.id}`,
      edit: 'Edit',
    }));

  return (
    <div className="table_container">
      <Table
        columns={columns}
        dataSource={data}
        rowClassName="table_row"
        scroll={{ x: '50vw' }}
        pagination = {{ pageSize: 6 }}
        title={() => <div>
          {' '}
          <Title level={3}>All Courses</Title>
          <Text type="secondary">
           In this table is a list of all the students in the university.
          </Text>{' '}
        </div>}
      />
    </div>
  );
};
