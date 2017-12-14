import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Show from './flatSharing/show'
import Create from './flatSharing/create'

import { flatSharing } from '../utils/request'
import store from '../utils/store'
class FlatSharing extends Component {
  constructor (props) {
    super(props)

    this.state = {
      flatsharing: []
    }
  }

  componentWillMount () {
    flatSharing().get('/flatsharing').then(res => {
      if (res.data.success === true) {
        this.setState({
          flatsharing: res.data.flatSharing
        })
      } else {
        store.notif(res.data.error, 'error')
      }
    }).catch(err => {
      console.log(err)
    })
  }

  render () {
    return (
      <Switch>
        <Route exact path='/flatsharing/show' component={Show} />
        <Route exact path='/flatsharing/create' component={Create} />
        <Route exact path='/flatsharing/update' component={Show} />
        <Redirect to='/flatsharing/show' />
      </Switch>
    )
  }
}

export default FlatSharing
