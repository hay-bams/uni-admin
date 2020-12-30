import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { RegisterInput } from '../../../graphql/globalTypes';
import { displayErrorMessage } from '../../../utils';

interface Props {
  onRegister: (input: RegisterInput) => void;
}

export const NewAdminForm = ({ onRegister }: Props) => {
  const onFinish = (values: any) => {
    onRegister(values);
  };

  const onFinishFailed = ({ errorFields }: any) => {
    displayErrorMessage(`Please complete all required form fields!`);
  };

  return (
    <Form
      name="normal_login"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{ remember: true }}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder="username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined  />}
          type="password"
          placeholder="password"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          register
        </Button>
      </Form.Item>
    </Form>
  );
};
