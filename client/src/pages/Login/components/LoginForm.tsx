import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { LoginInput } from '../../../graphql/globalTypes';
import { displayErrorMessage } from '../../../utils';

interface Props {
  onLogin: (input: LoginInput) => void;
}

export const LoginForm = ({ onLogin }: Props) => {
  const onFinish = (values: any) => {
    onLogin(values);
  };

  const onFinishFailed = ({ errorFields }: any) => {
    displayErrorMessage(`Please complete all required form fields!`);
  };

  return (
    <Form
      name="normal_login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
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
          Sign in
        </Button>
      </Form.Item>
      <Form.Item>
        <Link className="login-form-forgot" to="/">
          Forgot password
        </Link>
      </Form.Item>
    </Form>
  );
};
