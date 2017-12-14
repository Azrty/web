import React, { Component } from 'react'

import { flatSharing } from '../../utils/request'
import store from '../../utils/store'

class FSSettings extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      userMail: '',
      ownerMail: '',
      fs: {}
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value })
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
        <form onSubmit={() => console.log('TEST')}>
          <label>Add owner
            <input className='form-input' type='email' name='ownerMail' placeholder='Mail' value={this.state.ownerMail} onChange={this.handleChange} />
          </label>
          <button type='submit' className='form-btn' >Add</button>
        </form>
        <form onSubmit={() => console.log('TEST')}>
          <label>Add user
            <input className='form-input' type='email' name='userMail' placeholder='Mail' value={this.state.userMail} onChange={this.handleChange} />
          </label>
          <button className='form-btn' >Add</button>
        </form>
      </div>
    )
  }
}

export default FSSettings
