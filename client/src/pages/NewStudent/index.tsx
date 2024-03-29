import React from 'react';
import { Layout, Spin } from 'antd';
import { useMutation } from '@apollo/client';

import { Sidebar } from '../../lib/components/Sidebar';
import { BreadCrumbNav } from '../../lib/components/BreadCrumbNav';
import { ADD_NEW_STUDENT, STUDENTS } from '../../graphql';
import { Admin } from '../../lib/types';
import { Redirect } from 'react-router-dom';
import { NewStudentForm } from './component/NewStudentForm';
import {
  displayErrorMessage,
  displaySuccessNotification,
} from '../../utils/index';
import { AddNewStudentVariables,  AddNewStudent as AddNewStudentData } from '../../graphql/mutations/AddNewStudents/__generated__/AddNewStudent';
import { NewStudentInput } from '../../graphql/globalTypes';

interface Props {
  admin: Admin
}

const { Content } = Layout;


export const NewStudent = ({ admin }: Props) => {
  const [addNewStudent, { loading, data }] = useMutation<
  AddNewStudentData,
  AddNewStudentVariables
>(ADD_NEW_STUDENT, {
  onCompleted: () => {
    displaySuccessNotification("New student added successfully!");
  },
  onError: () => {
    displayErrorMessage(
      "Sorry! We weren't able to add this student. Please try again later."
    );
  },
  refetchQueries: () => (
    [
      {
        query: STUDENTS,
          variables: {
            all: 'all',
            limit: 1,
            page: 1,
          },
      },
    ]
  ),
});

const addStudent = (input: NewStudentInput) => {
  addNewStudent({
    variables: {
      input
    }
  })
}

if(!admin.id) {
  return <Redirect to="/login"/>
}


if (loading) {
  return (
    <Layout>
       <Sidebar />
       <Content className="add-student-spin">
      <Spin size="large" tip="Adding Student..." />
    </Content>
    </Layout>
  );
}

if (data && data.addNewStudent) {
  return <Redirect to={`/students`} />;
}

  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Content style={{ padding: '0 50px' }}>
          <BreadCrumbNav
            paths={[
              { title: 'Home', link: '/students' },
              { title: 'New-Students', link: '/new-student' },
            ]}
          />
          <NewStudentForm addStudent={addStudent} />
        </Content>
      </Layout>
    </Layout>
  );
};
