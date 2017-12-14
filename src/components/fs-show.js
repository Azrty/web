import React, { Component } from 'react'

import { flatSharing } from '../utils/request'
import store from '../utils/store'

import Trash from '../assets/trash.svg'
import Setting from '../assets/settings.svg'

class FlatSharingComp extends Component {
  delete (id) {
    flatSharing().delete('/flatsharing/' + this.props.id)
    .then(res => {
      if (res.data.success === true) {
        store.notif('Flatsharing deleted!', 'success')
        this.props.delete(this.props.id)
      } else {
        store.notif(res.data.error, 'error')
      }
    }).catch(err => {
      if (err.response) {
        if (Array.isArray(err.response.data.error)) {
          store.notif(err.response.data.error[0], 'error')
        } else {
          store.notif(err.response.data.error, 'error')
        }
      } else {
        console.log(err)
      }
    })
  }

  render () {
    return (
      <div className='fs' >
        <div className='fs-name'>{this.props.name}</div>
        <div className='fs-tool'>
          <img className='icon' src={Setting} alt='Settings' onClick={() => this.props.history.push(`/flatsharing/settings/${this.props.id}`)} />
          <img className='icon' src={Trash} alt='Delete' onClick={this.delete.bind(this)} />
        </div>
      </div>
    )
  }
}

export default FlatSharingComp
