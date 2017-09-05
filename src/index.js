import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './routes/app.js';
import Auth from './routes/login.js';
import History from './routes/history.js';

import registerServiceWorker from './utils/registerServiceWorker';
import './index.css';

ReactDOM.render((
  <Router>
    <Switch>
      <Route exact path='/' component={App} />
      <Route exact path='/login' component={Auth} />
      <Route exact path='/history' component={History} />
    </Switch>
  </Router>
), document.getElementById('root'));

registerServiceWorker();
