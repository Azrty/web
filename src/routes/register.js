import React, { Component } from 'react'

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
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value })
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
          <input className='form-input' type='text' name='username' placeholder='Username' value={this.state.username} onChange={this.handleChange} />
          <input className='form-input' type='email' name='mail' placeholder='Mail' value={this.state.mail} onChange={this.handleChange} />
          <input className='form-input' type='password' name='password' placeholder='Password' value={this.state.password} onChange={this.handleChange} />
          <input className='form-input' type='password' name='confirmPwd' placeholder='Confirm' value={this.state.confirmPwd} onChange={this.handleChange} />
          <button className='form-btn' type='submit'>Register</button>
        </form>
      </div>
    )
  }
}

export default Register
