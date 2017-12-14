import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { observer } from 'mobx-react'

import registerServiceWorker from './registerServiceWorker'

import store from './utils/store'

import Header from './components/header'
import Login from './routes/login'
import Register from './routes/register'
import FlatSharing from './routes/flatSharing'
import Settings from './routes/settings'
import Error from './components/error'

import './scss/index.scss'

@observer
class Index extends React.Component {
  componentWillMount () {
    if (global.localStorage.getItem('token')) store.logState(true)
    if (global.localStorage.getItem('token') &&
    (this.props.location.pathname.indexOf('login') !== -1 &&
    this.props.location.pathname.indexOf('register') !== -1)) this.props.history.push('/home')
    else if (!global.localStorage.getItem('token') &&
    this.props.location.pathname.indexOf('login') === -1 &&
    this.props.location.pathname.indexOf('register') === -1) this.props.history.push('/login')
  }

  render () {
    return (
      <div id='root-container'>
        <Error />
        <Header history={this.props.history} location={this.props.location} />
        <div id='container'>
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route path='/flatsharing' component={FlatSharing} />
            <Route exact path='/settings' component={Settings} />
            {store.isLogged
            ? <Redirect to='/flatsharing' />
            : <Redirect to='/login' />}
          </Switch>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <BrowserRouter>
    <Route component={Index} />
  </BrowserRouter>, document.getElementById('root'))
registerServiceWorker()

export default Index
