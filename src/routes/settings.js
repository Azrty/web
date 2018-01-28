import React, { Component } from 'react'

class Settings extends Component {
  changeUsername (e) {
    console.log(e)
  }

  render () {
    return (
      <div id='settings'>
        <form onSubmit={this.changeUsername.bind(this)}>
          <input className='primary-input' />
        </form>
      </div>
    )
  }
}

export default Settings
