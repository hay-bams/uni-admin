import React, { useState } from 'react';
import { Layout } from 'antd';
import { Sidebar } from '../../lib/components/Sidebar';
import { BreadCrumbNav } from '../../lib/components/BreadCrumbNav';
import { Courses } from './components/Courses';
import { useQuery } from '@apollo/client';
import { All_COURSES } from '../../graphql';
import {
  AllCoursesVariables,
  AllCourses as CoursesData,
} from '../../graphql/queries/AllCourses/__generated__/AllCourses';
import { ErrorBanner, AllCoursesSkeleton } from '../../lib/components';
import { Admin } from '../../lib/types';
import { Redirect } from 'react-router-dom';

interface Props {
  admin: Admin;
}

const { Content } = Layout;

const LIMIT = 2;

export const AllCourses = ({ admin }: Props) => {
  const [page] = useState(1);
  const { data, loading, error } = useQuery<CoursesData, AllCoursesVariables>(
    All_COURSES,
    {
      variables: {
        all: 'all',
        limit: LIMIT,
        page: page,
      },
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
