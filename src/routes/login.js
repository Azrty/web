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
    store.notif('Salut', 'info')
    auth().patch('/signin')
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err.response)
    })
  }

  render () {
    return (
      <div id='login'>
        <form onSubmit={this.handleSubmit}>
          <label>
            Mail:
            <input type='text' name='mail' value={this.state.value} onChange={this.handleChange} />
          </label>
          <label>
            Password:
            <input type='password' name='password' value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type='submit' value='Send' />
        </form>
      </div>
    )
  }
}

export default Login
