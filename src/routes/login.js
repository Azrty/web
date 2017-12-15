import React, { Component } from 'react'

import store from '../utils/store'
import { auth } from '../utils/request'

class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      mail: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit (e) {
    e.preventDefault()
    auth().patch('/signin', {
      mail: this.state.mail,
      password: this.state.password
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
      <div id='login'>
        <form onSubmit={this.handleSubmit}>
          <input className='form-input' type='text' name='email' placeholder='Mail' value={this.state.mail} onChange={this.handleChange} />
          <input className='form-input' type='password' name='password' placeholder='Password' value={this.state.password} onChange={this.handleChange} />
          <button className='form-btn' type='submit'>Login</button>
        </form>
      </div>
    )
  }
}

export default Login
