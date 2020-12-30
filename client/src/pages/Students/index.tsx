import React from 'react';
import { Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import { useQuery } from '@apollo/client';

import { Sidebar } from '../../lib/components/Sidebar';
import { BreadCrumbNav } from '../../lib/components/BreadCrumbNav';
import { Students } from './components/Students';
import { STUDENTS } from '../../graphql';
import {
  StudentsVariables,
  Students as StudentsData,
} from '../../graphql/queries/students/__generated__/Students';
import { ErrorBanner, StudentSkeleton } from '../../lib/components';
import { Admin } from '../../lib/types';

interface Props {
  admin: Admin
}

const { Content } = Layout;

export const AllStudents = ({ admin }: Props) => {
  const { data, loading, error } = useQuery<StudentsData, StudentsVariables>(
    STUDENTS,
    {
      variables: {
        all: 'all',
        limit: 1,
        page: 1,
      },
    },
  );

  if(!admin.id) {
    return <Redirect to="/login"/>
  }

  if (loading) { 
    return <StudentSkeleton />;
  }

  const StudentsRender =
    data && data.students && data.students.results ? (
      <Students students={data?.students.results} />
    ) : null;


  const ErrorBannerElement = error ? (
    <>
      <ErrorBanner description="Some error occured fetching the student lists. Please try again soon!" />{' '}
      <StudentSkeleton turnSidebarOff={true} />
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
              { title: 'All-Students', link: '/students' },
            ]}
          />
          {ErrorBannerElement}
          {StudentsRender}
        </Content>
      </Layout>
    </Layout>
  );
};
