import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Show from './purchases/show'
import Add from './purchases/add'

class Purchases extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/flatsharing/:flatSharingId/purchases' component={Show} />
        <Route exact path='/flatsharing/:flatSharingId/purchases/add' component={Add} />
        <Redirect to='/flatsharing/show' />
      </Switch>
    )
  }
}

export default Purchases
