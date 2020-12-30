import React from 'react';
import { Layout } from 'antd';
import { Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { Sidebar } from '../../lib/components/Sidebar';
import { BreadCrumbNav } from '../../lib/components/BreadCrumbNav';
import { Courses } from './components/Courses';
import { All_COURSES } from '../../graphql';
import {
  AllCoursesVariables,
  AllCourses as CoursesData,
} from '../../graphql/queries/AllCourses/__generated__/AllCourses';
import { ErrorBanner, AllCoursesSkeleton } from '../../lib/components';
import { Admin } from '../../lib/types';

interface Props {
  admin: Admin;
}

const { Content } = Layout;


export const AllCourses = ({ admin }: Props) => {
  const { data, loading, error } = useQuery<CoursesData, AllCoursesVariables>(
    All_COURSES,
    {
      variables: {
        all: 'all',
        limit: 1,
        page: 1,
      }
    }
  );

  if (!admin.id) {
    return <Redirect to="/login" />;
  }

  if (loading) {
    return <AllCoursesSkeleton />;
  }

  const CoursesRender =
    data && data.allCourses && data.allCourses.results ? (
      <Courses courses={data?.allCourses.results} />
    ) : null;

  const ErrorBannerElement = error ? (
    <>
      <ErrorBanner description="Some error occured fetching the courses lists. Please try again soon!" />{' '}
      <AllCoursesSkeleton turnSidebarOff={true} />
    </>
  ) : null;
  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Content style={{ padding: '0 50px' }}>
          <BreadCrumbNav
            paths={[
              { title: 'Home', link: '/students' },
              { title: 'All-Courses', link: '/courses' },
            ]}
          />
          {ErrorBannerElement}
          {CoursesRender}
        </Content>
      </Layout>
    </Layout>
  );
};
