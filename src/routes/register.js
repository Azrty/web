import React, { Component } from 'react'
import { Input, Button } from 'element-react'

import { auth } from '../utils/request'
import store from '../utils/store'
class Register extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      mail: '',
      password: '',
      confirmPwd: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (key, val) {
    this.setState({ [key]: val })
  }

  handleSubmit (e) {
    e.preventDefault()
    auth().post('/', {
      username: this.state.username,
      mail: this.state.mail,
      password: this.state.password,
      confirmPwd: this.state.confirmPwd
    }).then(res => {
      if (res.data.success === true) {
        global.localStorage.setItem('token', res.data.token)
        store.logState(true)
        this.props.history.push('/home')
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
      <div id='register'>
        <form onSubmit={this.handleSubmit}>
          <Input type='text' placeholder='Username' value={this.state.username} onChange={this.handleChange.bind(this, 'username')} />
          <Input type='mail' placeholder='Mail' value={this.state.mail} onChange={this.handleChange.bind(this, 'mail')} />
          <Input type='password' placeholder='Password' value={this.state.password} onChange={this.handleChange.bind(this, 'password')} />
          <Input type='password' placeholder='Confirm' value={this.state.confirmPwd} onChange={this.handleChange.bind(this, 'confirmPwd')} />
          <Button type='primary' nativeType='submit' loading={this.state.loading}>Register</Button>
        </form>
      </div>
    )
  }
}

export default Register
