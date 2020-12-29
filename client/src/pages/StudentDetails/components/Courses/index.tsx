import React from 'react';
import { Table, Tag, Typography, Row, Col, Button } from 'antd';
import {
  studentDetails_studentDetails,
  studentDetails_studentDetails_courses,
} from '../../../../graphql/queries/StudentDetails/__generated__/studentDetails';
import { AllCourses_allCourses_results } from '../../../../graphql/queries/AllCourses/__generated__/AllCourses';
interface Props {
  student?: studentDetails_studentDetails;
  courses?: AllCourses_allCourses_results[];
  addCourse: any;
  removeCourse: any;
  registerCourseLoading: boolean;
  unregisterCourseLoading: boolean;
}

const { Title, Text } = Typography;

export const Courses = ({
  student,
  courses,
  addCourse,
  removeCourse,
  registerCourseLoading,
  unregisterCourseLoading,
}: Props) => {
  const registerCourse = (studentId: string, courseId: string) => {
    addCourse({
      variables: {
        studentId,
        input: courseId,
      },
    });
  };

  const unregisterCourse = (studentId: string, courseId: string) => {
    removeCourse({
      variables: {
        studentId,
        courseId,
      },
    });
  };

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
          <Tag color={status === 'active' ? 'green' : 'red'} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
  ];

  const registeredTableColumns = [
    ...columns,
    {
      title: 'Remove',
      dataIndex: 'remove',
      className: 'table_column',
      width: 100,
      key: 'remove',
      render: (
        remove: string,
        record: studentDetails_studentDetails_courses,
        index: number
      ) => {
        const removeButton =
          student && student.id ? (
            <Button
              onClick={() => unregisterCourse(student?.id, record.id)}
              danger
            >
              {remove}
            </Button>
          ) : null;
        return removeButton;
      },
    },
  ];

  const unregisteredTableColumns = [
    ...columns,
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
        const registerButton =
          student && student.id ? (
            <Button
              onClick={() => registerCourse(student?.id, record.id)}
              type="primary"
              ghost
            >
              {register}
            </Button>
          ) : null;
        return registerButton;
      },
    },
  ];

  const registeredCourses: any =
    student && student.courses
      ? student.courses.map(
          (course: studentDetails_studentDetails_courses) => ({
            ...course,
            key: `${course.id}`,
            remove: 'remove',
          })
        )
      : [];

  const unregisteredCourses = [];
  const hashMap = new Map();

  if (registeredCourses) {
    for (const course of registeredCourses) {
      hashMap.set(course.id, course.id);
    }
  }

  if (courses) {
    for (const course of courses) {
      if (!hashMap.get(course.id)) {
        unregisteredCourses.push({
          ...course,
          key: `${course.id}`,
          register: 'register',
        });
      }
    }
  }

  return (
    <div className="table_container">
      <Title className="table-title" level={3}>{student?.name}</Title>
      <Row gutter={24} justify="space-between" className="courses">
        <Col xs={24} lg={12} className="registered_courses">
          <Table
            columns={registeredTableColumns}
            pagination={false}
            dataSource={registeredCourses}
            loading={unregisterCourseLoading}
            rowClassName="table_row"
            scroll={{ x: '50vw', y: '50vh' }}
            className="registered_course_table"
            title={() => (
              <div>
                {' '}
                <Title className="table-title" level={3}>Registered Courses</Title>
                <Text type="secondary">
                  Scroll right to see the other columns of the table
                </Text>
                <Text type="secondary"></Text>
              </div>
            )}
          />
        </Col>

        <Col xs={24} lg={12}>
          <Table
            columns={unregisteredTableColumns}
            pagination={false}
            dataSource={unregisteredCourses}
            loading={registerCourseLoading}
            rowClassName="table_row"
            scroll={{ x: '50vw', y: '50vh' }}
            title={() => (
              <div>
                {' '}
                <Title className="table-title" level={3}>Unregistered Courses</Title>
                <Text type="secondary">
                  Scroll right to see the other columns of the table
                </Text>
              </div>
            )}
          />
        </Col>
      </Row>
    </div>
  );
};
