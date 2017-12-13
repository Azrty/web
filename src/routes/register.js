import React, { Component } from 'react'
import { auth } from '../utils/request'

class Register extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      mail: '',
      password: '',
      confirmPwd: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit (e) {
    e.preventDefault()
    console.log(this.state)
    auth().post('/', {
      username: this.state.username,
      mail: this.state.mail,
      password: this.state.password,
      confirmPwd: this.state.confirmPwd
    })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err.response)
      })
  }

  render () {
    return (
      <div id='register'>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
          <input type='text' name='username' value={this.state.value} onChange={this.handleChange} />
          </label>
          <label>
            Mail:
          <input type='text' name='mail' value={this.state.value} onChange={this.handleChange} />
          </label>
          <label>
            Password:
          <input type='password' name='password' value={this.state.value} onChange={this.handleChange} />
          </label>
          <label>
            Confirm password:
          <input type='password' name='confirmPwd' value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type='submit' value='Submit' />
        </form>
      </div>
    )
  }
}

export default Register
