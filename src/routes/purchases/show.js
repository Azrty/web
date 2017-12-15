import React, { Component } from 'react'

import { flatSharing } from '../../utils/request'
import store from '../../utils/store'

class PurchasesView extends Component {
  constructor (props) {
    super(props)

    this.state = {
      stats: {},
      shop: '',
      price: 0,
      description: '',
      newPurchase: false
    }

    this.newPurchase = this.newPurchase.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  componentWillMount () {
    flatSharing().get(`/flatSharing/${this.props.match.params.flatSharingId}/purchases/stats`)
    .then(res => {
      if (res.data.success === true) {
        this.setState({stats: res.data.stats})
      } else {
        store.notif(res.data.error, 'error')
      }
    })
    .catch(err => {
      if (err.response) {
        store.notif(err.response.data.error, 'error')
      } else {
        console.log(err)
        store.notif(`Can't reach your server...`, 'error')
      }
    })
  }

  componentDidUpdate () {
    this.setColor()
  }

  setColor () {
    let elmts = document.getElementsByClassName('userStats')
    if (elmts.length === 0) return
    for (let index = 0; index < elmts.length; index++) {
      elmts[index].style.backgroundColor = 'rgb(38, 212, 238)'
      elmts[index].style.boxShadow = 'rgba(38, 212, 238, 0.5) 0px 6px 20px'
    }
  }

  newPurchase (e) {
    e.preventDefault()
    this.setState((previousState, props) => {
      return { newPurchase: !previousState.newPurchase }
    })
  }

  handleConfirm (e) {
  }

  handleChange (e) {
    this.setState({ [e.target.id]: e.target.value })
  }

  handleLogout (e) {
    e.preventDefault()
    global.localStorage.removeItem('token')
    this.props.history.push('/')
  }

  render () {
    return (
      <div id='purchases'>
        {this.state.stats.users
        ? <div className='stats'>
          {this.state.stats.users.map(elmt => {
            return (
              <div className='userStats' key={elmt.id}>
                <p>{elmt.username}</p>
                <p>{elmt.amount.toFixed(2)}</p>
                <p>{elmt.pourcentage}%</p>
              </div>
            )
          })}
          <div className='globalStats'>
            <p>{this.state.stats.maxAmount.toFixed(2)}</p>
            <p>{this.state.stats.totalAmount.toFixed(2)}</p>
          </div>
        </div>
       : null}
      </div>
    )
  }
}

export default PurchasesView
