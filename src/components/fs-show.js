import React, { Component } from 'react'

import store from '../utils/store'

import Trash from '../assets/trash.svg'
import Setting from '../assets/settings.svg'
import Shop from '../assets/shop.svg'

class FlatSharingComp extends Component {
  render () {
    return (
      <div className='fs' >
        <div className='fs-name'>{this.props.name}</div>
        <div className='fs-tool'>
          <img className='icon' src={Shop} alt='Shop' onClick={() => this.props.history.push(`/flatsharing/${this.props.id}/purchases`)} />
          <img className='icon' src={Setting} alt='Settings' onClick={() => this.props.history.push(`/flatsharing/${this.props.id}/settings`)} />
          <img className='icon' src={Trash} alt='Delete' onClick={() => {
            store.flatSharing.deleteById(this.props.id)
            store.notif.add('Flat sharing deleted!', 'success')
          }} />
        </div>
      </div>
    )
  }
}

export default FlatSharingComp
