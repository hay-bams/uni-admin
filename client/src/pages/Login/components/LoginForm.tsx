import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { LoginInput } from '../../../graphql/globalTypes';

interface Props {
  onLogin: (input: LoginInput) => void;
  setForm: <TValue>(key: string, value: TValue) => void;
  form: LoginInput;
}

export const LoginForm = ({ onLogin, setForm, form }: Props) => {
  return (
    <Form
      name="normal_login"
      // className="login-form"
      initialValues={{ remember: true }}
    >
      <Form.Item
        name="username"
        // className="form-item-input"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input
          onChange={(e) => setForm<string>('username', e.target.value)}
          prefix={<UserOutlined />}
          placeholder="username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          onChange={(e) => setForm<string>('password', e.target.value)}
          prefix={<LockOutlined  />}
          type="password"
          placeholder="password"
        />
      </Form.Item>
      <Form.Item>
        <Button
          onClick={() => onLogin(form)}
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
