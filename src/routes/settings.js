import React, { Component } from 'react'

import store from '../utils/store'
import { auth } from '../utils/request'

class Settings extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      oldPassword: '',
      newPassword: '',
      newConfirmPwd: '',
      mail: '',
      disable: true
    }
  }

  onChange (e) {
    this.setState({
      [e.target.name]: e.target.value,
      disable: false
    })
  }

  onSubmit (e) {
    e.preventDefault()
    let obj = {}
    if (this.state.newPassword !== this.state.newConfirmPwd) {
      store.notif.add('Password mismatch!', 'error')
      return
    }
    this.setState({ disable: true })
    if (this.state.username !== '') obj.username = this.state.username
    if (this.state.newPassword !== '') obj.password = this.state.newPassword
    if (this.state.mail !== '') obj.mail = this.state.mail
    auth().put('/me', obj).then(res => {
      this.setState({
        username: '',
        oldPassword: '',
        newPassword: '',
        newConfirmPwd: '',
        mail: ''
      })
      if (res.status === 200) store.notif.add('Change applied', 'success')
    }).catch(err => {
      if (err.response) {
        store.notif.add(err.response.data.err, 'error')
      } else {
        store.notif.add('Somethings went wrong', 'error')
      }
    })
  }

  render () {
    return (
      <div id='settings'>
        <form onSubmit={this.onSubmit.bind(this)}>
          <input className='primary-input' name='mail' type='email' placeholder='Mail' value={this.state.mail} onChange={this.onChange.bind(this)} />
          <input className='primary-input' name='username' placeholder='Username' value={this.state.username} onChange={this.onChange.bind(this)} />
          <input className='primary-input' name='newPassword' type='password' placeholder='New Password' value={this.state.NewPassword} onChange={this.onChange.bind(this)} />
          <input className='primary-input' name='newConfirmPwd' type='password' placeholder='Confirm Password' value={this.state.newConfirmPwd} onChange={this.onChange.bind(this)} />
          <br />
          <input className='primary-input' name='oldPassword' type='password' placeholder='Old Password' value={this.state.oldPassword} onChange={this.onChange.bind(this)} />
          <button className='primary-btn' type='submit' disabled={this.state.disable}>Save</button>
        </form>
      </div>
    )
  }
}

export default Settings
