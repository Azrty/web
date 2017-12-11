import React, { Component } from 'react'

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
    console.log(this.state)
    console.log('Form submited')
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
          <input type='submit' value='Submit' />
        </form>
      </div>
    )
  }
}

export default Login
