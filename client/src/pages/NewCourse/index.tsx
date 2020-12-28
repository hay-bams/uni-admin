import React from 'react';
import { Layout, Spin } from 'antd';
import { Sidebar } from '../../lib/components/Sidebar';
import { BreadCrumbNav } from '../../lib/components/BreadCrumbNav';

import { useMutation } from '@apollo/client';
import { Admin } from '../../lib/types';
import { Redirect } from 'react-router-dom';
import { NewCourseForm } from './component/NewCourseForm';
import {
  displayErrorMessage,
  displaySuccessNotification,
} from '../../utils/index';
import { NewCourseInput } from '../../graphql/globalTypes';
import { ADD_NEW_COURSE } from '../../graphql/mutations/AddNewCourse';
import { AddNewCourse as AddNewCourseData, AddNewCourseVariables } from '../../graphql/mutations/AddNewCourse/__generated__/AddNewCourse';

interface Props {
  admin: Admin
}

const { Content } = Layout;


export const NewCourse = ({ admin }: Props) => {
  const [addNewCourse, { loading, data }] = useMutation<
  AddNewCourseData,
  AddNewCourseVariables
>(ADD_NEW_COURSE, {
  onCompleted: () => {
    displaySuccessNotification("New course added successfully!");
  },
  onError: () => {
    displayErrorMessage(
      "Sorry! We weren't able to add this course. Please try again later."
    );
  },
});

const addCourse = (input: NewCourseInput) => {
  addNewCourse({
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
      <Spin size="large" tip="Creating Course..." />
    </Content>
    </Layout>
  );
}

if (data && data.addNewCourse) {
  return <Redirect to={`/courses`} />;
}

  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Content style={{ padding: '0 50px' }}>
          <BreadCrumbNav
            paths={[
              { title: 'Home', link: '/students' },
              { title: 'New-Course', link: '/new-course' },
            ]}
          />
          <NewCourseForm addCourse={addCourse} />
        </Content>
      </Layout>
    </Layout>
  );
};
