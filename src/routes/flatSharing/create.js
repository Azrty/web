import React, { Component } from 'react'

import store from '../../utils/store'
import { flatSharing } from '../../utils/request'

class CreateFS extends Component {
  constructor (props) {
    super(props)

    this.state = {
      name: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit (e) {
    e.preventDefault()
    this.setState({ loading: true })
    flatSharing().post('/flatsharing', {
      name: this.state.name
    }).then(res => {
      this.setState({ loading: false })
      if (res.data.success === true) {
        this.props.history.push('/flatsharing/show')
      } else {
        store.notif(res.data.error, 'error')
      }
    }).catch(err => {
      this.setState({ loading: false })
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
          <input className='primary-input' type='text' name='name' placeholder='Name' value={this.state.name} onChange={this.handleChange} />
          <button className='primary-btn' type='submit'>Create</button>
        </form>
      </div>
    )
  }
}

export default CreateFS
