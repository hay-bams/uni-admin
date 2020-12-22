import React from 'react';
import { useMutation } from '@apollo/client';

import { LoginForm } from './components/LoginForm';
import {
  Login as LoginData,
  LoginVariables,
} from '../../graphql/mutations/Login/__generated__/Login';
import { LOG_IN } from '../../graphql';
import { LoginInput } from '../../graphql/globalTypes';
import { useForm } from '../../lib/hooks/useForm';
// import { User } from '../../lib/types';
import { Login_login as User } from '../../graphql/mutations/Login/__generated__/Login'
import { Redirect } from 'react-router-dom';
import { displaySuccessNotification } from '../../utils';
import { Spin, Layout } from 'antd';
import { ErrorBanner } from '../../lib/components';
import { Admin } from '../../lib/types';


interface Props {
  setAdmin: (user: Admin) => void;
  admin: Admin;
}

const { Content } = Layout;

export const Login = ({ setAdmin, admin }: Props) => {
  const [
    login,
    { data: loginData, loading: loginLoading, error: loginError },
  ] = useMutation<LoginData, LoginVariables>(LOG_IN, {
    onCompleted: (data) => {
      if (data && data.login) {
        setAdmin(data.login);
        displaySuccessNotification(
          'Login Success',
          'You are successfully Logged in'
        );
      }
    },
  });

  const { form, setValue: setForm } = useForm();

  const onLogin = (input: LoginInput) => {
    login({
      variables: {
        input: { ...input, withCookie: false },
      },
    });
  };

  if (loginLoading) {
    return (
      <Content className="login-in-spin">
        <Spin size="large" tip="Logging you in" />
      </Content>
    );
  }

  // If user is logged in, Redirect
  if (admin.id) {
    return <Redirect to="/students" />;
  }

  if (loginData && loginData.login.id) {
    const { id: userId } = loginData.login;
    return <Redirect to={`/students`} />;
  }

  const Error = loginError ? (
    <ErrorBanner
      message="Uh oh! Something went wrong :("
      description={loginError?.message}
    />
  ) : null;

  return (
    <Content>
      {Error}
      <div className="login_form">
        <h1 className="signin-title">Sign In</h1>
        <LoginForm onLogin={onLogin} setForm={setForm} form={form} />
      </div>
    </Content>
  );
};