import React, { Component } from 'react'

import { emojify } from 'react-emojione'

import FlatSharingComp from '../../components/fs-show'

import { flatSharing } from '../../utils/request'
import store from '../../utils/store'

const options = {
  convertShortnames: true,
  style: {
    height: 16,
    margin: 2
  }
}

class ShowFS extends Component {
  constructor (props) {
    super(props)

    this.state = {
      flatsharing: []
    }
  }

  componentWillMount () {
    flatSharing().get('/flatsharing').then(res => {
      if (res.data.success === true) {
        this.setState({
          flatsharing: res.data.flatSharing
        })
      } else {
        store.notif.add(res.data.error, 'error')
      }
    }).catch(err => {
      console.log(err)
    })
  }

  deleteById (id) {
    let newArr = this.state.flatsharing
    newArr.splice(newArr.indexOf(id), 1)
    this.setState({
      flatsharing: newArr
    })
  }

  render () {
    return (
      <div id='fs-show'>
        {this.state.flatsharing.length === 0
          ? (
            <div>
              <p>{emojify('No flatsharing :cry:', options)}</p>
              <button className='primary-btn' onClick={() => {
                this.props.history.push('/flatsharing/create')
              }}>Create one</button>
            </div>
          ) : (
            <div>
              <div className='fs-container'>
                {this.state.flatsharing.map(elmt => {
                  return <FlatSharingComp
                    key={elmt._id}
                    name={elmt.name}
                    id={elmt._id}
                    delete={this.deleteById.bind(this)}
                    history={this.props.history}
                />
                })}
              </div>
              <button className='primary-btn' onClick={() => {
                this.props.history.push('/flatsharing/create')
              }}>Add one</button>
            </div>
          )}
      </div>
    )
  }
}

export default ShowFS
