import React, { Component } from 'react'

import { emojify } from 'react-emojione'

import { flatSharing } from '../../utils/request'
import store from '../../utils/store'

const options = {
  convertShortnames: true,
  style: {
    height: 16,
    margin: 2
  }
}

let ShowFlatSHaring = (props) => {
  return (
    <div>
      <div>{props.name}</div>
    </div>
  )
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
        store.notif(res.data.error, 'error')
      }
    }).catch(err => {
      console.log(err)
    })
  }

  render () {
    return (
      <div id='ShowFS'>
        {this.state.flatsharing.length === 0
          ? (
            <div>
              <p>{emojify('No flatsharing :cry:', options)}</p>
              <button className='form-btn' onClick={() => {
                this.props.history.push('/flatsharing/create')
              }}>Create one</button>
            </div>
          ) : (
            <div>
              <div className='fs-container'>
                {this.state.flatsharing.map((elmt, index) => <ShowFlatSHaring key={index} name={elmt.name} />)}
              </div>
              <button className='form-btn' onClick={() => {
                this.props.history.push('/flatsharing/create')
              }}>Add one</button>
            </div>
          )}
      </div>
    )
  }
}

export default ShowFS
