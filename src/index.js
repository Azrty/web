import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import App from './routes/app.js';
import Auth from './routes/login.js';
import History from './routes/history.js';

import registerServiceWorker from './utils/registerServiceWorker';
import './index.css';

ReactDOM.render((
  <Router>
    <Switch>
      <Route exact path='/' component={Auth} />
      <Route exact path='/basket' component={App} />
      <Route exact path='/history' component={History} />
      <Redirect to='/basket' />
    </Switch>
  </Router>
), document.getElementById('root'));

registerServiceWorker();
