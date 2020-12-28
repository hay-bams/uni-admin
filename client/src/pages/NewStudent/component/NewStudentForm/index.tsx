import React from 'react';
import {
  Button,
  Form,
  Input,
  Layout,
  Typography,
} from 'antd';

import { NewStudentInput } from '../../../../graphql/globalTypes';
import { displayErrorMessage } from '../../../../utils';

interface Props {
  addStudent: (form: NewStudentInput) => void;
}

const { Content } = Layout;
const { Text, Title } = Typography;
const { Item } = Form;

export const NewStudentForm = ({ addStudent }: Props) => {
  const onFinish = (values: any) => {
    addStudent(values);
  };

  const onFinishFailed = ({ errorFields }: any) => {
    displayErrorMessage(`Please complete all required form fields!`);
  };

  return (
    <Content className="new-student-content">
      <Form
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="student-form-header">
          <Title level={3} className="student-title">
            New Students Form
          </Title>
          <Text type="secondary">
            In this form, we'll collect some basic information about the
            student.
          </Text>
        </div>

        <Item
          label="Full Name"
          name="name"
          extra="Max character count of 100"
          rules={[
            {
              required: true,
              message: "Please enter student's full name!",
            },
          ]}
        >
          <Input
            maxLength={100}
            placeholder="John Doe"
          />
        </Item>

        <Item
          label="Email Address"
          name="email"
          extra="Max character count of 100"
          rules={[
            {
              required: true,
              message: "Please enter student's email address!",
            },
          ]}
        >
          <Input
            maxLength={100}
            placeholder="JohnDoe@gmail.com"
          />
        </Item>

        <Item
          label="Country"
          name="country"
          extra="Max character count of 100"
          rules={[
            {
              required: true,
              message: "Please enter student's country!",
            },
          ]}
        >
          <Input
            maxLength={100}
            placeholder="Ethopia"
          />
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
