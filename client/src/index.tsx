import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useMutation,
} from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout, Spin } from 'antd';

import reportWebVitals from './reportWebVitals';
import {
  AllStudents,
  AppHeader,
  Login,
  NotFound,
  StudentDetails,
  Home,
  NewStudent,
  NewCourse,
  RegisterAdmin
} from './pages';
import { Admin } from './lib/types';
import {
  Login as LoginData,
  LoginVariables,
} from './graphql/mutations/Login/__generated__/Login';
import { LOG_IN } from './graphql';
import { AppHeaderSkeleton, ErrorBanner } from './lib/components';
import './styles/index.css';

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: 'http://localhost:9005/api',
  cache,
  credentials: 'include',
});

const initialUser: Admin = {
  id: null,
  username: null,
  madeRequest: false,
};

const App = () => {
  const [login, { error }] = useMutation<LoginData, LoginVariables>(LOG_IN, {
    onCompleted: (data) => {
      if (data && data.login) {
        setAdmin(data.login);
      }
    },
  });

  const [admin, setAdmin] = useState<Admin>(initialUser);
  const loginRef = useRef(login);

  useEffect(() => {
    loginRef.current({ variables: { input: { withCookie: true } } });
  }, []);

  const LoginErrorBanner = error ? (
    <ErrorBanner
      message="Uh oh! Something went wrong :("
      description={error?.message}
    />
  ) : null;

  if (!admin.madeRequest && !error) {
    return (
      <Layout>
        <AppHeaderSkeleton />
        <div className="launch-spinner">
          <Spin tip="Launching School Admin" size="large" />
        </div>
      </Layout>
    );
  }

  return (
    <Router>
      <Layout className="app layout">
        <AppHeader admin={admin} setAdmin={setAdmin} />
        {LoginErrorBanner}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/new-student" component={NewStudent} />

          <Route exact path="/new-course" component={NewCourse} />

          <Route
            exact
            path="/students"
            render={(props) => <AllStudents {...props} admin={admin} />}
          />
          <Route
            exact
            path="/login"
            render={(props) => (
              <Login {...props} setAdmin={setAdmin} admin={admin} />
            )}
          />
           <Route
            exact
            path="/register"
            render={(props) => (
              <RegisterAdmin {...props} setAdmin={setAdmin} admin={admin} />
            )}
          />
          <Route
            exact
            path="/students/:id"
            render={(props) => <StudentDetails {...props} admin={admin} />}
          />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
