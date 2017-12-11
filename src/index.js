import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import registerServiceWorker from './registerServiceWorker'

import Header from './components/header'
import Login from './routes/login'
import Register from './routes/register'
// import Footer from './components/footer'

import './scss/index.scss'

class Index extends React.Component {
  render () {
    return (
      <div id='root-container'>
        <Header history={this.props.history} />
        <Switch>
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Redirect to='/login' />
        </Switch>
        {/* <Footer /> */}
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
