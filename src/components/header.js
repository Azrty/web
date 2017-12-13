import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react'

import store from '../utils/store'

@observer
class Header extends Component {
  render () {
    return (
      <div id='header'>
        <p ref={(elem) => { this.name = elem }} className='name'>FlatSharing</p>
        {store.isLogged
        ? (
          <ul className='menu'>
            <Link to='/home'><li>Home</li></Link>
            <Link to='/flatsharing'><li>Flatsharing</li></Link>
            <Link to='/settings'><li>Settings</li></Link>
          </ul>
        ) : (
          <ul className='menu'>
            <Link to='/login'><li>Log in</li></Link>
            <Link to='/register'><li>Register</li></Link>
          </ul>
        )}
      </div>
    )
  }
}

export default Header
