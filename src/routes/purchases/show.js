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
    let color = []
    let elmts = document.getElementsByClassName('userStats')
    if (elmts.length === 0) return
    for (let index = 0; index < elmts.length; index++) {
      color[index] = {
        r: Math.floor(Math.random() * 255) + 1,
        g: Math.floor(Math.random() * 255) + 1,
        b: Math.floor(Math.random() * 255) + 1
      }
      let coef = Math.round(((parseInt(color[index].r, 10) * 299) + (parseInt(color[index].g, 10) * 587) + (parseInt(color[index].b, 10) * 114)) / 1000, 10)
      elmts[index].style.backgroundColor = `rgb(${color[index].r}, ${color[index].g}, ${color[index].b})`
      elmts[index].style.boxShadow = `0px 8px 20px 5px rgba(${color[index].r}, ${color[index].g}, ${color[index].b}, 0.5) `
      elmts[index].style.color = (coef > 125) ? '#303133' : '#E4E4E4'
    }
    let inner = document.getElementsByClassName('inner')
    if (inner.length === 0) return
    for (let index = 0; index < inner.length; index++) {
      inner[index].style.backgroundImage = `linear-gradient(0deg, transparent 0%, transparent 50%, var(--bg-color) 50%, var(--bg-color) 100%),
                linear-gradient(${180 / 100 * this.state.stats.users[index].pourcentage}deg, red 0%, red 50%, blue 50%, blue 100%)`
      setTimeout(() => {
        inner[index].classList.add('rotate')
      }, (index + 0.5) * 1000)
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
            <div className='graph'>
              {this.state.stats.users.map(elmt => {
                return (
                  <div className='inner' key={elmt.id}>
                    <div className='inner-after' />
                  </div>
                )
              })}
            </div>
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
