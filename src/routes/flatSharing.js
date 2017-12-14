import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Show from './flatSharing/show'
import Create from './flatSharing/create'
import Settings from './flatSharing/settings'

class FlatSharing extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/flatsharing/show' component={Show} />
        <Route exact path='/flatsharing/create' component={Create} />
        <Route exact path='/flatsharing/settings/:id' component={Settings} />
        <Redirect to='/flatsharing/show' />
      </Switch>
    )
  }
}

export default FlatSharing
