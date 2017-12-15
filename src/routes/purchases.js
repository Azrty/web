import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Show from './purchases/show.js'

class Purchases extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/flatsharing/:flatSharingId/purchases' component={Show} />
        <Redirect to='/flatsharing/show' />
      </Switch>
    )
  }
}

export default Purchases
