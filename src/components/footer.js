import React, { Component } from 'react'

class Footer extends Component {
  render () {
    return (
      <div id='footer'>
        <div className='credit'>
          <p className='copyright' dangerouslySetInnerHTML={{ __html: global.emojione.toImage(':copyright: 2017 - All right reserved') }} />
          <p className='author' >Made with React by Alexandre MARRE</p>
        </div>
        {/* <div className='links'>
        </div> */}
      </div>
    )
  }
}

export default Footer
