import React from 'react';
import { Table, Tag, Typography, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
  studentDetails_studentDetails,
  studentDetails_studentDetails_courses,
} from '../../../../graphql/queries/StudentDetails/__generated__/studentDetails';
import { AllCourses_allCourses } from '../../../../graphql/queries/AllCourses/__generated__/AllCourses';

interface Props {
  student?: studentDetails_studentDetails;
  courses?: AllCourses_allCourses[]
}

const { Title } = Typography;

export const Courses = ({ student, courses }: Props) => {
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
      title: 'Category',
      dataIndex: 'category',
      className: 'table_column',
      width: 100,
      key: 'category',
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
        record: studentDetails_studentDetails_courses,
        index: number
      ) => {
        return (
          <Tag color={'green'} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },

    {
      title: 'Register',
      dataIndex: 'register',
      className: 'table_column',
      width: 100,
      key: 'register',
      render: (
        register: string,
        record: studentDetails_studentDetails_courses,
        index: number
      ) => {
        return (
          <Button type="primary">
            {register}
          </Button>
        );
      },
    },
  ];

  const registeredCourses: any =
    student && student.courses ?
    student.courses.map((course: studentDetails_studentDetails_courses) => ({
      ...course,
      key: `${course.id}`,
    })): []

  const unregisteredCourses = []
  const hashMap = new Map()

    if(registeredCourses) {
      for(const course of registeredCourses) {
        hashMap.set(course.id, course.id)
      }
    }

    if(courses) {
      for(const course of courses) {
        if(!hashMap.get(course.id)) {
          unregisteredCourses.push( {
            ...course,
            key: `${course.id}`,
            register: 'register'
          })
         }
      }
    }

  console.log(unregisteredCourses)
  

  return (
    <div className="table_container">
      <Title level={3}>{student?.name}</Title>
      <Row gutter={24} justify="space-between" className="courses">
        <Col xs={24} lg={12} className="registered_courses">
          <Table
            columns={columns}
            pagination={false}
            dataSource={registeredCourses}
            rowClassName="table_row"
            scroll={{ x: '50vw', y: '50vh' }}
            className="registered_course_table"
            title={() => <Title level={5}>Registered Courses</Title>}
          />
        </Col>

        <Col xs={24} lg={12}>
          <Table
            columns={columns}
            pagination={false}
            dataSource={unregisteredCourses}
            rowClassName="table_row"
            scroll={{ x: '50vw', y: '50vh' }}
            title={() => <Title level={5}>Unregistered Courses</Title>}
          />
        </Col>
      </Row>
    </div>
  );
};
