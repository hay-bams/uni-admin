import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import { AllStudents, AppHeader, Home, NotFound } from './pages';

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: 'http://localhost:9005/api',
  cache,
});

const App = () => {
  return (
    <Router>
      <Layout className="app layout">
        <AppHeader />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/students" component={AllStudents} />
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
