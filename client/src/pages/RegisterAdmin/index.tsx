import React from 'react';
import { useMutation } from '@apollo/client';
import { Spin, Layout } from 'antd';
import { Redirect } from 'react-router-dom';

import {
  RegisterAdmin as RegisterAdminData,
  RegisterAdminVariables,
} from '../../graphql/mutations/RegisterAdmin/__generated__/RegisterAdmin';
import { NewAdminForm } from './components/NewAdminForm';
import { REGISTER_ADMIN } from '../../graphql';
import { RegisterInput } from '../../graphql/globalTypes';
import { displaySuccessNotification } from '../../utils';
import { ErrorBanner } from '../../lib/components';
import { Admin } from '../../lib/types';

interface Props {
  setAdmin: (user: Admin) => void;
  admin: Admin;
}

const { Content } = Layout;

export const RegisterAdmin = ({ setAdmin, admin }: Props) => {
  const [
    register,
    { data, loading, error },
  ] = useMutation<RegisterAdminData, RegisterAdminVariables>(REGISTER_ADMIN, {
    onCompleted: (data) => {
      if (data && data.register) {
        setAdmin(data.register);
        sessionStorage.setItem('token', data.register.token || '');
        displaySuccessNotification(
          'Registration Successful',
          'You are successfully Logged in'
        );
      }
    },
  });

  const onRegister = (input: RegisterInput) => {
    register({
      variables: {
        input: {
          ...input
        },
      },
    });
  };

  if (loading) {
    return (
      <Content className="login-in-spin">
        <Spin size="large" tip="Registering you..." />
      </Content>
    );
  }

  // If user is logged in, Redirect
  if (admin.id) {
    return <Redirect to="/students" />;
  }

  if (data && data.register.id) {
    return <Redirect to={`/students`} />;
  }

  const Error = error ? (
    <ErrorBanner
      message="Uh oh! Something went wrong :("
      description={error?.message}
    />
  ) : null;

  return (
    <Content>
      {Error}
      <div className="login_form">
        <h1 className="register-title">Register</h1>
        <NewAdminForm onRegister={onRegister} />
      </div>
    </Content>
  );
};
