import React from 'react';
import { Layout, Skeleton } from 'antd';
import { Sidebar } from '../Sidebar';

interface Props {
  turnSidebarOff?: boolean;
}

const { Content } = Layout;

export const UpdateCourseFormSkeleton = ({ turnSidebarOff }: Props) => {
  return (
    <Layout>
      {!turnSidebarOff ? <Sidebar /> : null}
      <Content className="new-course-content" style={{ padding: '0 50px' }}>
        <div className="student-form-header">
          <Skeleton paragraph={{ rows: 0 }} />
        </div>
          <Skeleton paragraph={{ rows: 0 }} />
          <Skeleton paragraph={{ rows: 0 }} /> 
          <Skeleton paragraph={{ rows: 0 }} />
         

          <Skeleton paragraph={{ rows: 0 }} />
          <Skeleton paragraph={{ rows: 0 }} />
          <Skeleton paragraph={{ rows: 0 }} />
        
          <Skeleton paragraph={{ rows: 0 }} />
      </Content>
    </Layout>
  );
};
