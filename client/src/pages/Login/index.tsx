import React from 'react';
import { useMutation } from '@apollo/client';

import { LoginForm } from './components/LoginForm';
import {
  Login as LoginData,
  LoginVariables,
} from '../../graphql/mutations/Login/__generated__/Login';
import { LOG_IN } from '../../graphql';
import { LoginInput } from '../../graphql/globalTypes';
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
      if (data && data.login && data.login.token) {
        setAdmin(data.login);
        sessionStorage.setItem('token', data.login.token);
        displaySuccessNotification(
          'Login Success',
          'You are successfully Logged in'
        );
      }
    },
    onError: () => {
      console.log('Some Error occured')
    }
  });

  const onLogin = (input: LoginInput) => {
    login({
      variables: {
        input: {
          ...input,
          withCookie: false,
        },
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
        <LoginForm onLogin={onLogin} />
      </div>
    </Content>
  );
};
