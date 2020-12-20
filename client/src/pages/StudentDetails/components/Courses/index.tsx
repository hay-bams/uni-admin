import React from 'react';
import { Table, Tag, Typography, Row, Col, Button } from 'antd';
import {
  studentDetails_studentDetails,
  studentDetails_studentDetails_courses,
} from '../../../../graphql/queries/StudentDetails/__generated__/studentDetails';
import { AllCourses_allCourses } from '../../../../graphql/queries/AllCourses/__generated__/AllCourses';
import { useMutation } from '@apollo/client';
import { ADD_COURSES } from '../../../../graphql';
import {
  AddCourse as AddCourseData,
  AddCourseVariables,
} from '../../../../graphql/mutations/AddCourses/__generated__/AddCourse';
import { displaySuccessNotification } from '../../../../utils';

interface Props {
  student?: studentDetails_studentDetails;
  courses?: AllCourses_allCourses[];
  studentRefetch: any;
  courseRefetch: any;
}

const { Title } = Typography;

export const Courses = ({
  student,
  studentRefetch,
  courses,
  courseRefetch,
}: Props) => {
  const [addCourse, { data, loading, error }] = useMutation<
    AddCourseData,
    AddCourseVariables
  >(ADD_COURSES, {
    onCompleted: (data) => {
      if (data.addCourses) {
        studentRefetch();
        courseRefetch();
        displaySuccessNotification('Course Registered Successfully');
      }
    },
  });

  const registerCourse = (studentId: string, courseId: string) => {
    addCourse({
      variables: {
        studentId,
        input: courseId,
      },
    });
  };

  const unregisterCourse  = (studentId: string, courseId: string) => {}

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

  ]

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
            remove: 'remove'
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
      <Title level={3}>{student?.name}</Title>
      <Row gutter={24} justify="space-between" className="courses">
        <Col xs={24} lg={12} className="registered_courses">
          <Table
            columns={registeredTableColumns}
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
            columns={unregisteredTableColumns}
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
