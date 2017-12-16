import React, { Component } from 'react'
import { observer } from 'mobx-react'

import store from '../utils/store.js'

@observer
class Notification extends Component {
  render () {
    return (
      <div id='notification'>
        {store.notif.notification}
      </div>
    )
  }
}

export default Notification