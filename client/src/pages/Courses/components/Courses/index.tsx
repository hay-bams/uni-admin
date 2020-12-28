import React from 'react';
import { Table, Typography } from 'antd';
import {
  AllCourses_allCourses,
  AllCourses_allCourses_results,
} from '../../../../graphql/queries/AllCourses/__generated__/AllCourses';

interface Props {
  courses: AllCourses_allCourses['results']
}

const { Title } = Typography;

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
    }
  ];

  const data: any =
    courses &&
    courses.map((course: AllCourses_allCourses_results) => ({
      ...course,
      key: `${course.id}`,
    }));

  return (
    <div className="table_container">
      <Table
        columns={columns}
        dataSource={data}
        rowClassName="table_row"
        scroll={{ x: '50vw' }}
        pagination = {{ pageSize: 6 }}
        title={() => <Title level={3}>All Courses</Title>}
      />
    </div>
  );
};
