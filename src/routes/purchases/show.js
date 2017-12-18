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
      newPurchase: false,
      loading: true
    }

    this.newPurchase = this.newPurchase.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)
  }

  componentWillMount () {
    flatSharing().get(`/flatSharing/${this.props.match.params.flatSharingId}/purchases/stats`)
    .then(res => {
      this.setState({ loading: false })
      if (res.data.success === true) {
        this.setState({stats: res.data.stats})
      } else {
        store.notif.add(res.data.error, 'error')
      }
    })
    .catch(err => {
      this.setState({ loading: false })
      if (err.response) {
        store.notif.add(err.response.data.error, 'error')
      } else {
        console.log(err)
        store.notif.add(`Can't reach your server...`, 'error')
      }
    })
  }

  componentDidUpdate () {
    let elmts = document.getElementsByClassName('userStats')
    if (elmts.length === 0) return
    for (let index = 0; index < elmts.length; index++) {
      let { r, g, b } = {
        r: Math.floor(Math.random() * 255) + 1,
        g: Math.floor(Math.random() * 255) + 1,
        b: Math.floor(Math.random() * 255) + 1
      }
      let coef = Math.round(((parseInt(r, 10) * 299) + (parseInt(g, 10) * 587) + (parseInt(b, 10) * 114)) / 1000, 10)
      elmts[index].style.backgroundColor = `rgb(${r}, ${g}, ${b})`
      elmts[index].style.boxShadow = `0px 8px 20px 5px rgba(${r}, ${g}, ${b}, 0.5) `
      elmts[index].style.color = (coef > 125) ? '#303133' : '#E4E4E4'
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

  render () {
    return (
      <div id='purchases'>
        {this.state.stats.users && this.state.stats.users.length > 0
        ? (
          <div className='stats'>
            <div className='statsContainer'>
              {this.state.stats.users.map(elmt => {
                return (
                  <div className='userStats' key={elmt.id}>
                    <p>{elmt.username}</p>
                    <p>{elmt.amount.toFixed(2)}€</p>
                    <p>{elmt.pourcentage.toFixed(2)}%</p>
                  </div>
                )
              })}
            </div>
            <div className='globalStats'>
              <p>Max amount: {this.state.stats.maxAmount.toFixed(2)}€</p>
              <p>Total amount: {this.state.stats.totalAmount.toFixed(2)}€</p>
            </div>
          </div>
        ) : (
          this.state.loading
        ? (
          <div>
            Loading...
          </div>
        ) : (
          <div>
            There are no stats :(
          </div>
        )
        )}
        <button className='primary-btn' onClick={
          () => this.props.history.push(`/flatsharing/${this.props.match.params.flatSharingId}/purchases/add`)
        }>Add purchases</button>
      </div>
    )
  }
}

export default PurchasesView
