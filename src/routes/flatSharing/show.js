import React, { Component } from 'react'
import store from '../../utils/store'
import { observer } from 'mobx-react'

import FlatSharingComp from '../../components/fs-show'

import { emojify } from 'react-emojione'

const options = {
  convertShortnames: true,
  style: {
    height: 16,
    margin: 2
  }
}

@observer
class ShowFS extends Component {
  componentWillMount () {
    store.flatSharing.getFlatSharings()
  }

  render () {
    return (
      <div id='fs-show'>
        {store.flatSharing.flatSharings.length === 0
          ? (
            <React.Fragment>
              <p>{emojify('No flatsharing :cry:', options)}</p>
              <button className='primary-btn' onClick={() => {
                this.props.history.push('/flatsharing/create')
              }}>Create one</button>
            </React.Fragment>
          ) : (
            <div>
              <div className='fs-container'>
                {store.flatSharing.flatSharings.map(elmt => {
                  return <FlatSharingComp
                    key={elmt._id}
                    name={elmt.name}
                    id={elmt._id}
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
