import React, { Component } from 'react'
import { Button, Input } from 'element-react'

import store from '../utils/store'
import { auth } from '../utils/request'

class Login extends Component {
  constructor (props) {
    super(props)

    this.state = {
      mail: '',
      password: '',
      loading: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (key, val) {
    this.setState({ [key]: val })
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
          <Input type='text' placeholder='Mail' value={this.state.mail} onChange={this.handleChange.bind(this, 'mail')} />
          <Input type='password' placeholder='Password' value={this.state.password} onChange={this.handleChange.bind(this, 'password')} />
          <Button type='primary' nativeType='submit' loading={this.state.loading}>Login</Button>
        </form>
      </div>
    )
  }
}

export default Login
