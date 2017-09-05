import React from 'react';

import { observer } from 'mobx-react';

import Store from '../utils/store.js'

@observer
class Graph extends React.Component {
  render () {
    return (
      <div className='graph'>
        {
          Store.users.map(elem => {
            let height = 'calc(' + (elem.amount * 100) / Store.totalAmount + '% + 60px)';
            return (
              <div key={elem.username} className='item' style={{height}}>
                <div>
                  {elem.amount.toFixed(2)}
                </div>
                <div>
                  {elem.username}
                </div>
              </div>
            );
          })
        }
      </div>
    )
  }  
}

export default Graph