import React from 'react';
import { Table, Button, Typography } from 'antd';
import { Link } from 'react-router-dom';

import {
  Students_students,
  Students_students_results,
} from '../../../../graphql/queries/students/__generated__/Students';

interface Props {
  students: Students_students['results'];
}

const { Title, Text } = Typography;

export const Students = ({ students }: Props) => {
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
      render: (view: any, record: any, index: any) => {
        return (
          <div data-testid="viewbtn">
            <Link to={`/students/${record.id}`}>
              <Button type="primary">{view}</Button>
            </Link>
          </div>
        );
      },
    },
  ];

  const data: any =
    students &&
    students.map((student: Students_students_results) => ({
      ...student,
      key: `${student.id}`,
      view: 'view',
    }));

  return (
    <div className="table_container">
      <Table
        columns={columns}
        dataSource={data}
        rowClassName="table_row"
        scroll={{ x: '50vw' }}
        pagination={{ pageSize: 6 }}
        title={(): JSX.Element => (
          <div>
            {' '}
            <Title className="table-title" level={3}>All Students</Title>
            <Text type="secondary">
             In this table is a list of all the students in the university.
            </Text>{' '}
          </div>
        )}
      />
    </div>
  );
};
