import React from 'react';
import { Layout, Spin } from 'antd';
import { Sidebar } from '../../lib/components/Sidebar';
import { BreadCrumbNav } from '../../lib/components/BreadCrumbNav';

import { useMutation, useQuery } from '@apollo/client';
import { Admin } from '../../lib/types';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import {
  displayErrorMessage,
  displaySuccessNotification,
} from '../../utils/index';
import { UpdateCourseInput } from '../../graphql/globalTypes';
import {
  UpdateCourse as UpdateCourseData,
  UpdateCourseVariables,
} from '../../graphql/mutations/UpdateCourse/__generated__/UpdateCourse';
import { UPDATE_COURSE } from '../../graphql/mutations/UpdateCourse';
import { UpdateCourseForm } from './UpdateCourseForm';
import { COURSE_DETAILS } from '../../graphql/queries/CourseDetails';
import {
  courseDetails as courseDetailsData,
  courseDetailsVariables,
} from '../../graphql/queries/CourseDetails/__generated__/courseDetails';

interface Props {
  admin: Admin;
}

interface MatchParams {
  id: string;
}

const { Content } = Layout;

export const UpdateCourse = ({
  admin,
  match,
}: Props & RouteComponentProps<MatchParams>) => {
  const { data, loading, refetch } = useQuery<
    courseDetailsData,
    courseDetailsVariables
  >(COURSE_DETAILS, {
    variables: {
      courseId: match.params.id,
    },
  });

  const [
    updateCurrentCourse,
    { loading: updateCourseLoading },
  ] = useMutation<UpdateCourseData, UpdateCourseVariables>(UPDATE_COURSE, {
    onCompleted: () => {
      console.log('+++++++++++++++++++++++++++')
      displaySuccessNotification('course updated successfully!');
      refetch();
    },
    onError: () => {
      displayErrorMessage(
        "Sorry! We weren't able to update this course. Please try again later."
      );
    },
  });

  const updateCourse = (input: UpdateCourseInput) => {
    updateCurrentCourse({
      variables: {
        courseId: match.params.id,
        input,
      },
    });
  };

  if (!admin.id) {
    return <Redirect to="/login" />;
  }

  if (loading) {
    return (
      <Layout>
        <Sidebar />
        <Content className="add-student-spin">
          <Spin size="large" tip="Loading Course..." />
        </Content>
      </Layout>
    );
  }

  if (updateCourseLoading) {
    return (
      <Layout>
        <Sidebar />
        <Content className="add-student-spin">
          <Spin size="large" tip="Updatingf Student..." />
        </Content>
      </Layout>
    );
  }

  const courseDetails = data && data.courseDetails ? data.courseDetails : null;

  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Content style={{ padding: '0 50px' }}>
          <BreadCrumbNav
            paths={[
              { title: 'Home', link: '/students' },
              { title: 'Update-Course', link: '/update-course' },
            ]}
          />
          <UpdateCourseForm updateCourse={updateCourse} data={courseDetails} />
        </Content>
      </Layout>
    </Layout>
  );
};
