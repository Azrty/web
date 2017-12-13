import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import registerServiceWorker from './registerServiceWorker'

import Header from './components/header'
import Login from './routes/login'
import Register from './routes/register'
import Error from './components/error'

import './scss/index.scss'
import 'element-theme-default'

class Index extends React.Component {
  render () {
    return (
      <div id='root-container'>
        <Error />
        <Header history={this.props.history} />
        <div id='container'>
          <Switch>
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Redirect to='/login' />
          </Switch>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <BrowserRouter>
    <Index />
  </BrowserRouter>, document.getElementById('root'))
registerServiceWorker()

export default Index
