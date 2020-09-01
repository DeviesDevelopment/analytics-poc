import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import TrustStore from './TrustStore';
import Analytics from './Analytics';
import UserAnalytics from './UserAnalytics';
import './index.css';

const App = () => {
  return (
    <div>
      <nav className="navbar navbar-light">
        <ul className="nav navbar-nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/user-analytics">User Analytics</Link></li>
        </ul>
      </nav>

      <Analytics />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/user-analytics" component={UserAnalytics} />
      </Switch>

    </div>
  );
};

const Home = (props) => (
  <div>
    <h2>Home</h2>
    <p>Welcome stranger!</p>
    <p>This page collects usage behavior data.<br />Browse the tabs above to view the collected statistics aggregated in various ways.</p>
    <p>Source code available here: <a href="https://github.com/DeviesDevelopment/analytics-poc">https://github.com/DeviesDevelopment/analytics-poc</a></p>
  </div>
);

export default App;
