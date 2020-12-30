import React from 'react';
import {
  Button,
  Form,
  Input,
  InputNumber,
  Layout,
  Radio,
  Typography,
} from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

import { NewCourseInput } from '../../../graphql/globalTypes';
import { displayErrorMessage } from '../../../utils';

interface Props {
  addCourse: (form: NewCourseInput) => void;
}

const { Content } = Layout;
const { Text, Title } = Typography;
const { Item } = Form;

export const NewCourseForm = ({ addCourse }: Props) => {
  const onFinish = (values: any) => {
    addCourse(values);
  };

  const onFinishFailed = ({ errorFields }: any) => {
    displayErrorMessage(`Please complete all required form fields!`);
  };

  return (
    <Content className="new-course-content">
      <Form
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="student-form-header">
          <Title className="table-title" level={3}>
            New Course Form
          </Title>
          <Text type="secondary">
            In this form, we'll add new courses for the university.
          </Text>
        </div>

        <Item
          label="Name"
          name="name"
          extra="Max character count of 100"
          rules={[
            {
              required: true,
              message: 'Please enter the course title!',
            },
          ]}
        >
          <Input maxLength={100} placeholder="Geology" />
        </Item>

        <Item
          label="Max # of Seats available for this course"
          name="totalSeats"
          rules={[
            {
              required: true,
              message:
                'Please enter a max number of seats available for this course!',
            },
          ]}
        >
          <InputNumber min={1} placeholder="100" />
        </Item>

        <Item
          label="Course Status"
          name="status"
          rules={[{ required: true, message: 'Please select a status!' }]}
        >
          <Radio.Group>
            <Radio.Button value={'active'}>
              <CheckCircleOutlined style={{ color: '#1890ff' }} />{' '}
              <span>Active</span>
            </Radio.Button>
            <Radio.Button value={'inactive'}>
              <CloseCircleOutlined style={{ color: '#1890ff' }} />{' '}
              <span>Inactive</span>
            </Radio.Button>
          </Radio.Group>
        </Item>

        <Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Item>
      </Form>
    </Content>
  );
};
