import React from 'react';
import { Layout } from 'antd';
import { Sidebar } from '../../lib/components/Sidebar';
import {
  BreadCrumbNav,
  CourseTableSkeleton,
  ErrorBanner,
} from '../../lib/components';
import { Courses } from './components/Courses';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { STUDENT_DETAILS, All_COURSES, REGISTER_COURSE } from '../../graphql';
import {
  studentDetailsVariables,
  studentDetails as StudentsDetailsData,
} from '../../graphql/queries/StudentDetails/__generated__/studentDetails';
import { AllCourses as AllCoursesData } from '../../graphql/queries/AllCourses/__generated__/AllCourses';
import {
  RegisterCourse as RegisterCourseData,
  RegisterCourseVariables,
} from '../../graphql/mutations/RegisterCourse/__generated__/RegisterCourse';
import {
  UnregisterCourse as UnregisterCourseData,
  UnregisterCourseVariables,
} from '../../graphql/mutations/UnregisterCourse/__generated__/UnregisterCourse';
import { displaySuccessNotification } from '../../utils';
import { UNREGISTER_COURSE } from '../../graphql/mutations/UnregisterCourse';
import { Admin } from '../../lib/types';

interface Props {
  admin: Admin;
}
interface MatchParams {
  id: string;
}

const { Content } = Layout;

const LIMIT = 2

export const StudentDetails = ({
  match,
  admin,
}: Props & RouteComponentProps<MatchParams>) => {
  const {
    data: StudentData,
    loading: studentLoading,
    error: StudentError,
    refetch: studentRefetch,
  } = useQuery<StudentsDetailsData, studentDetailsVariables>(STUDENT_DETAILS, {
    variables: {
      id: match.params.id,
    },
  });

  const {
    data: CoursesData,
    loading: coursesLoading,
    error: CoursesError,
    refetch: courseRefetch,
  } = useQuery<AllCoursesData>(All_COURSES, {
    variables: {
      all: 'all',
      limit: LIMIT,
      page: 1,
    },
  });

  const [
    addCourse,
    { loading: registerCourseLoading, error: registerCourseError },
  ] = useMutation<RegisterCourseData, RegisterCourseVariables>(
    REGISTER_COURSE,
    {
      onCompleted: (data) => {
        if (data.registerCourse) {
          studentRefetch();
          courseRefetch();
          displaySuccessNotification('Course Registered Successfully');
        }
      },
    }
  );

  const [
    removeCourse,
    { loading: unregisterCourseLoading, error: unregisterCourseError },
  ] = useMutation<UnregisterCourseData, UnregisterCourseVariables>(
    UNREGISTER_COURSE,
    {
      onCompleted: (data) => {
        if (data.unregisterCourse) {
          studentRefetch();
          courseRefetch();
          displaySuccessNotification('Course Unregistered');
        }
      },
    }
  );

  if (!admin.id) {
    return <Redirect to="/login" />;
  }

  const CoursesRender =
    (
      <Courses
        student={StudentData?.studentDetails}
        addCourse={addCourse}
        removeCourse={removeCourse}
        courses={CoursesData?.allCourses.results}
        registerCourseLoading={registerCourseLoading}
        unregisterCourseLoading={unregisterCourseLoading}
      />
    ) || null;

  if (
    studentLoading ||
    coursesLoading
    // registerCourseLoading ||
    // unregisterCourseLoading
  ) {
    return <CourseTableSkeleton />;
  }

  const RegisterErrorBanner = registerCourseError ? (
    <>
      <ErrorBanner description="Some Error occured while attempting to register your course. Please try again later" />{' '}
    </>
  ) : null;

  const UnregisterErrorBanner = unregisterCourseError ? (
    <>
      <ErrorBanner description="Some Error occured while attempting to unregister your course. Please try again later" />{' '}
    </>
  ) : null;

  const ErrorBannerElement =
    CoursesError || StudentError ? (
      <>
        <ErrorBanner description="Some error occured fetching the student details. Please try again soon!" />{' '}
        <CourseTableSkeleton turnSidebarOff={true} />
      </>
    ) : null;

  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Content style={{ padding: '0 50px' }}>
          <BreadCrumbNav
            paths={[
              { title: 'Home', link: 'Home' },
              { title: 'All-Students', link: '/students' },
              {
                title: 'Student-Details',
                link: `/students/${StudentData?.studentDetails.id}`,
              },
            ]}
          />
          {ErrorBannerElement}
          {RegisterErrorBanner}
          {UnregisterErrorBanner}
          {CoursesRender}
        </Content>
      </Layout>
    </Layout>
  );
};
