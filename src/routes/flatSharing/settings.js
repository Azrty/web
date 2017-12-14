import React, { Component } from 'react'

import { flatSharing } from '../../utils/request'
import store from '../../utils/store'

class FSSettings extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      fs: {}
    }
  }

  componentDidMount () {
    flatSharing().get(`/flatsharing/${this.props.match.params.id}`)
    .then(res => {
      if (res.data.success === true) {
        this.setState({fs: res.data.flatSharing})
      }
    })
    .catch(err => {
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

  addUser (user) {
    console.log('addUser')
  }

  addOwner (owner) {
    console.log('addOwner')
  }

  render () {
    return (
      <div id='fs-settings'>
        {this.state.fs.name}
        <label>Add owners
          <input className='form-input' type='text' name='name' onChange={this.handleChange} />
        </label>
        <button className='form-btn' >Add</button>
        <label>Add users
          <input className='form-input' type='text' name='name' onChange={this.handleChange} />
        </label>
        <button className='form-btn' >Add</button>
      </div>
    )
  }
}

export default FSSettings
