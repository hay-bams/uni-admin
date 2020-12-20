import React, { useState } from 'react';
import { Layout } from 'antd';
import { Sidebar } from '../../lib/components/Sidebar';
import { BreadCrumbNav } from '../../lib/BreadCrumbNav';
import { Courses } from './components/Courses';
import { RouteComponentProps } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { STUDENT_DETAILS, All_COURSES } from '../../graphql';
import {
  studentDetailsVariables,
  studentDetails as StudentsDetailsData,
} from '../../graphql/queries/StudentDetails/__generated__/studentDetails';
import { AllCourses as AllCoursesData } from '../../graphql/queries/AllCourses/__generated__/AllCourses';

interface MatchParams {
  id: string;
}

const { Content } = Layout;

export const StudentDetails = ({ match }: RouteComponentProps<MatchParams>) => {
  const {
    data: StudentData,
    loading: StudentLoading,
    error: StudentError,
    refetch: studentRefetch
  } = useQuery<StudentsDetailsData, studentDetailsVariables>(STUDENT_DETAILS, {
    variables: {
      id: match.params.id,
    },
  });

  const {
    data: CoursesData,
    loading: CoursesLoading,
    error: CoursesError,
    refetch: courseRefetch
  } = useQuery<AllCoursesData>(All_COURSES);

  const CoursesRender =
    (
      <Courses
        student={StudentData?.studentDetails}
        studentRefetch={studentRefetch}
        courseRefetch={courseRefetch}
        courses={CoursesData?.allCourses}
      />
    ) || null;

  if (StudentLoading) {
  }

  if (StudentError) {
  }

  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Content style={{ padding: '0 50px' }}>
          <BreadCrumbNav paths={['Home', 'All_Sudents', 'Student_Details']} />
          {CoursesRender}
        </Content>
      </Layout>
    </Layout>
  );
};
