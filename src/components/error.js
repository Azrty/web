import React, { Component } from 'react'
import { observer } from 'mobx-react'

import store from '../utils/store.js'

@observer
class Error extends Component {
  render () {
    return (
      <div id='error'>
        {store.error}
      </div>
    )
  }
}

export default Error