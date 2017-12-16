import React, { Component } from 'react'

import { flatSharing } from '../../utils/request'
import store from '../../utils/store'

class FSSettings extends Component {
  constructor (props) {
    super(props)

    this.state = {
      userMail: '',
      ownerMail: '',
      name: '',
      fs: {}
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  componentDidMount () {
    flatSharing().get(`/flatsharing/${this.props.match.params.id}`)
    .then(res => {
      console.log(res.data)
      if (res.data.success === true) {
        this.setState({fs: res.data.flatSharing})
      }
    })
    .catch(err => {
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

  changeName (e) {
    e.preventDefault()
    flatSharing().put(`/flatsharing/${this.props.match.params.id}`, {
      name: this.state.name
    }).then(res => {
      if (res.data.success === true) {
        store.notif('Name changed!', 'success')
        this.setState(prevState => {
          let fs = prevState.fs
          fs.name = prevState.name
          return {
            name: '',
            fs
          }
        })
      }
    }).catch(err => {
      if (err.response) {
        store.notif(err.response.data.error, 'error')
      } else {
        store.notif(`Can't reach server`, 'error')
      }
    })
  }

  addUser (e) {
    e.preventDefault()
    flatSharing().post(`/flatsharing/user`, {
      flatSharingId: this.props.match.params.id,
      mail: this.state.userMail
    }).then(res => {
      if (res.data.success === true) {
        store.notif('User added!', 'success')
        this.setState({ userMail: '' })
      }
    }).catch(err => {
      if (err.response) {
        store.notif(err.response.data.error, 'error')
      } else {
        store.notif(`Can't reach server`, 'error')
      }
    })
  }

  addOwner (e) {
    e.preventDefault()
    flatSharing().post(`/flatsharing/owner`, {
      flatSharingId: this.props.match.params.id,
      mail: this.state.ownerMail
    }).then(res => {
      if (res.data.success === true) {
        store.notif('Owner added!', 'success')
        this.setState({ ownerMail: '' })
      }
    }).catch(err => {
      if (err.response) {
        store.notif(err.response.data.error, 'error')
      } else {
        store.notif(`Can't reach server`, 'error')
      }
    })
  }

  deleteOwner (id, e) {
    flatSharing().delete(`/flatsharing/${this.props.match.params.id}/owner/${id}`, {
      flatSharingId: this.props.match.params.id,
      mail: this.state.ownerMail
    }).then(res => {
      if (res.data.success === true) {
        store.notif('Owner deleted!', 'success')
        e.target.parentNode.removeChild(e.target)
      } else {
        store.notif(res.data.error, 'error')
      }
    }).catch(err => {
      if (err.response) {
        store.notif(err.response.data.error, 'error')
      } else {
        store.notif(`Can't reach server`, 'error')
      }
    })
  }

  deleteUser (id, e) {
    flatSharing().delete(`/flatsharing/${this.props.match.params.id}/user/${id}`, {
      flatSharingId: this.props.match.params.id,
      mail: this.state.ownerMail
    }).then(res => {
      if (res.data.success === true) {
        store.notif('Owner deleted!', 'success')
        e.target.parentNode.removeChild(e.target)
      } else {
        store.notif(res.data.error, 'error')
      }
    }).catch(err => {
      if (err.response) {
        store.notif(err.response.data.error, 'error')
      } else {
        store.notif(`Can't reach server`, 'error')
      }
    })
  }

  render () {
    return (
      <div id='fs-settings'>
        <form className='changeName' onSubmit={this.changeName.bind(this)}>
          <label>Name:
            <input className='primary-input' type='text' name='name' placeholder={this.state.fs.name} value={this.state.name} onChange={this.handleChange} />
          </label>
          <button className='primary-btn' >Change</button>
        </form>
        <div className='owners'>
          <p>Owners:</p>
          {this.state.fs.owners
          ? this.state.fs.owners.map(elmt => {
            return <p key={elmt._id} onClick={this.deleteOwner.bind(this, elmt._id)}>{elmt.username}</p>
          })
          : null}
        </div>
        <form className='addOwner' onSubmit={this.addUser.bind(this)}>
          <label>Add
            <input className='primary-input' type='email' name='userMail' placeholder='Mail' value={this.state.userMail} onChange={this.handleChange} />
          </label>
          <button className='primary-btn' >Add</button>
        </form>
        <div className='users'>
          <p>Users:</p>
          {this.state.fs.users
            ? this.state.fs.owners.map(elmt => {
              return <p key={elmt._id} onClick={this.deleteUser.bind(this, elmt._id)}>{elmt.username}</p>
            })
          : null}
        </div>
        <form className='addUser' onSubmit={this.addOwner.bind(this)}>
          <label>Add
            <input className='primary-input' type='email' name='ownerMail' placeholder='Mail' value={this.state.ownerMail} onChange={this.handleChange} />
          </label>
          <button type='submit' className='primary-btn' >Add</button>
        </form>
      </div>
    )
  }
}

export default FSSettings
