import React, { useState } from 'react';
import { Layout } from 'antd';
import { Sidebar } from '../../lib/components/Sidebar';
import { BreadCrumbNav } from '../../lib/components/BreadCrumbNav';
import { Students } from './components/Students';
import { useQuery } from '@apollo/client';
import { STUDENTS } from '../../graphql';
import {
  StudentsVariables,
  Students as StudentsData,
} from '../../graphql/queries/Students/__generated__/Students';
import { ErrorBanner, StudentSkeleton } from '../../lib/components';
import { Admin } from '../../lib/types';
import { Redirect } from 'react-router-dom';

interface Props {
  admin: Admin
}

const { Content } = Layout;

const LIMIT = 2;

export const AllStudents = ({ admin }: Props) => {
  const [page] = useState(1);
  const { data, loading, error } = useQuery<StudentsData, StudentsVariables>(
    STUDENTS,
    {
      variables: {
        all: 'all',
        limit: LIMIT,
        page: page,
      },
    }
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
              { title: 'Home', link: 'Home' },
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
