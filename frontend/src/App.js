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
          <li><Link to="/api-docs">API Docs</Link></li>
          <li><Link to="/trust-store">Trust Store</Link></li>
          <li><Link to="/vehicle-data">Vehicle Data</Link></li>
          <li><Link to="/vehicle-gate-log">Vehicle Gate Log</Link></li>
          <li><Link to="/user-analytics">User Analytics</Link></li>
        </ul>
      </nav>

      <Analytics />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/api-docs" component={ApiDocs} />
        <Route path="/trust-store" component={TrustStore} />
        <Route path="/vehicle-data" component={VehicleData} />
        <Route path="/vehicle-gate-log" component={VehicleGateLog} />
        <Route path="/user-analytics" component={UserAnalytics} />
      </Switch>

    </div>
  );
}

const Home = (props) => (
  <div>
    <h2>Home</h2>
    <p>Welcome to the fake DPAP!</p>
    <p>This page collects usage behavior data.<br />Go to <strong>User Analytics</strong> tab to view.</p>
  </div>
)

const ApiDocs = () => (
  <div>
    <h2>API Docs</h2>
    <p>API Docs stuff</p>
  </div>
)

const VehicleGateLog = () => (
  <div>
    <h2>Vehicle Gate Log</h2>
    <p>Vehicle Gate Log stuff</p>
  </div>
)

const VehicleData = () => (
  <div>
    <h2>Vehicle Data</h2>
    <p>Vehicle Data stuff</p>
  </div>
)


export default App;
