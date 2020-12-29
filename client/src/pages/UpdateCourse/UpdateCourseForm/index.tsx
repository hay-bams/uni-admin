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
import { UpdateCourseInput } from '../../../graphql/globalTypes';
import { displayErrorMessage } from '../../../utils';
import { courseDetails_courseDetails } from '../../../graphql/queries/CourseDetails/__generated__/courseDetails';

interface Props {
  updateCourse: (form: UpdateCourseInput) => void;
  data: courseDetails_courseDetails | null;
}

const { Content } = Layout;
const { Text, Title } = Typography;
const { Item } = Form;

export const UpdateCourseForm = ({ updateCourse, data }: Props) => {
  const onFinish = (values: any) => {
    updateCourse(values);
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
          <Title level={3} className="student-title">
            Update Course Form
          </Title>
          <Text type="secondary">
            In this form, we'll add update a course for the university.
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
          <Input defaultValue={data?.name} maxLength={100} placeholder="Geology" />
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
          <InputNumber defaultValue={data?.totalSeats} min={1} placeholder="100" />
        </Item>

        <Item
          label="Course Status"
          name="status"
          rules={[{ required: true, message: 'Please select a status!' }]}
        >
          <Radio.Group defaultValue={data?.status}>
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
            Update
          </Button>
        </Item>
      </Form>
    </Content>
  );
};
