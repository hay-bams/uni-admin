import React, { useState } from 'react';
import { Layout } from 'antd';
import { Sidebar } from './components/Sidebar';
import { BreadCrumbNav } from './components/BreadCrumbNav';
import { Students } from './components/Student';
import { useQuery } from '@apollo/client';
import { STUDENT } from '../../graphql';
import {
  StudentsVariables,
  Students as StudentsData,
} from '../../graphql/queries/students/__generated__/Students';

const { Content } = Layout;

const LIMIT = 2;

export const Admin = () => {
  const [page, _] = useState(1);
  const { data, loading, error } = useQuery<StudentsData, StudentsVariables>(
    STUDENT,
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
      <Students students={data?.students.results} />
    ) : null;

  if (loading) {
  }

  if (error) {
  }
  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Content style={{ padding: '0 50px' }}>
          <BreadCrumbNav />
          {StudentsRender}
        </Content>
      </Layout>
    </Layout>
  );
};
