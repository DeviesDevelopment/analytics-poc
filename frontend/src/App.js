import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import PageVisits from './pages/PageVisits';
import Sessions from './pages/Sessions';
import UserAgents from './pages/UserAgents';
import TimeSpent from './pages/TimeSpent';
import PerDay from './pages/PerDay';
import Analytics from './Analytics';
import './index.css';

const App = () => {
  return (
    <div>
      <nav className="navbar navbar-light">
        <ul className="nav navbar-nav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/sessions">Sessions</Link></li>
          <li><Link to="/page-visits">Page Visists</Link></li>
          <li><Link to="/user-agents">User Agents</Link></li>
          <li><Link to="/time-spent">Time Spent</Link></li>
          <li><Link to="/per-day">Visists Per Day</Link></li>
        </ul>
      </nav>

      <Analytics />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/sessions" component={Sessions} />
        <Route path="/page-visits" component={PageVisits} />
        <Route path="/user-agents" component={UserAgents} />
        <Route path="/time-spent" component={TimeSpent} />
        <Route path="/per-day" component={PerDay} />
      </Switch>

    </div>
  );
};

const Home = (props) => (
  <div>
    <h2>Home</h2>
    <p>Welcome stranger!</p>
    <p>This page is a demonstration of that it is possible to collect and aggregate user analytics without using any third-party tools.</p>
    <p>Feel free to browser around for a while and view this month's collected data using the tabs above. 
      As soon as you finish your browser session (by closing this tab, refreshing the page or navigating to a different website), 
      details about your session will be sent to our backend and stored in database.
      If you come back here again you will therefore notice that the numbers have changed.
      Also note that the numbers will reset on the first day of each month.
    </p>
    <p>No personal data is gathered this way.</p>
    <p>Read more in this blog post: <a href="https://sundin.github.io/implementation/2020/09/01/analytics-poc.html">https://sundin.github.io/implementation/2020/09/01/analytics-poc.html</a></p>
    <p>Source code available here: <a href="https://github.com/DeviesDevelopment/analytics-poc">https://github.com/DeviesDevelopment/analytics-poc</a></p>
  </div>
);

export default App;
