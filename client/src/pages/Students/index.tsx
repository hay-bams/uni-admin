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
import { StudentSkeleton } from '../../lib/components';

const { Content } = Layout;

const LIMIT = 2;

export const AllStudents = () => {
  const [page, _] = useState(1);
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

  const StudentsRender =
    data && data.students && data.students.results ? (
      <Students loading={loading} students={data?.students.results} />
    ) : null;

  if (loading) {
    return <StudentSkeleton />
  }

  if (error) {
  }
  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Content style={{ padding: '0 50px' }}>
          <BreadCrumbNav paths={['Home', 'All_Students']} />
          {StudentsRender}
        </Content>
      </Layout>
    </Layout>
  );
};
