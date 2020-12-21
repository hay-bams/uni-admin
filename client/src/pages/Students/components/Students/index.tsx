import React from 'react';
import { Table, Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
  Students_students,
  Students_students_results,
} from '../../../../graphql/queries/Students/__generated__/Students';

interface Props {
  students: Students_students['results'];
}

const { Title } = Typography;

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
      render: (view: any, record: any, index: any) => {
        return (
          <Link to={`/students/${record.id}`}>
            <Button type="primary">{view}</Button>
          </Link>
        );
      },
    },
  ];

  const data: any =
    students &&
    students.map((student: Students_students_results) => ({
      ...student,
      dob: moment(student.dob).format('MMM Do YYYY'),
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
        pagination = {{ pageSize: 2 }}
        title={() => <Title level={3}>All Students</Title>}
      />
    </div>
  );
};
