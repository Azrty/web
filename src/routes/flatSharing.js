import React, { Component } from 'react'

import { emojify } from 'react-emojione'

import { flatSharing } from '../utils/request'
import store from '../utils/store'

const options = {
  convertShortnames: true,
  style: {
    height: 16,
    margin: 2
  }
}

let ShowFlatSHaring = (props) => {
  console.log(props)
  return (
    <div>
      <div>{props.name}</div>
    </div>
  )
}

class FlatSharing extends Component {
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
      <div id='flatSharing'>
        {this.state.flatsharing.length === 0
        ? (
          <div>
            <p>{emojify('No flatsharing :cry:', options)}</p>
            <button>Create one</button>
          </div>
        ) : (
          this.state.flatsharing.map((elmt, index) => <ShowFlatSHaring name={elmt.name} index={index} />)
        )}
      </div>
    )
  }
}

export default FlatSharing
