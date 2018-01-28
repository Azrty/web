import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { flatSharing } from '../../utils/request'

import store from '../../utils/store'

import Select from 'react-select'

@observer
class Add extends Component {
  constructor (props) {
    super(props)

    this.state = {
      shop: '',
      amount: '',
      buyer: undefined,
      users: [],
      desc: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillMount () {
    store.flatSharing.getFlatSharing(this.props.match.params.fsId)
  }

  handleChange (e, val) {
    if (e === true) return this.setState({ 'buyer': val })
    if (e.target.name === 'amount' && e.target.value.match(/^[-0-9]?[.]?[.0-9]+$/) === null && e.target.value !== '') return
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit (e) {
    e.preventDefault()
    let buyer
    if (this.state.buyer === undefined) buyer = undefined
    else buyer = this.state.buyer.value
    flatSharing().post(`/purchase`, {
      shop: this.state.shop,
      amount: parseFloat(this.state.amount),
      buyer: buyer,
      desc: this.state.desc,
      flatSharing: this.props.match.params.fsId
    }).then(res => {
      if (res.data.success === true) {
        store.notif.add('Purchase added!', 'success')
        this.props.history.push(`/flatsharing/${this.props.match.params.fsId}/purchases`)
      }
    }).catch(err => {
      if (err.response) {
        if (Array.isArray(err.response.data.error)) {
          store.notif.add(err.response.data.error[0], 'error')
        } else {
          store.notif.add(err.response.data.error, 'error')
        }
      } else {
        store.notif.add(`Can't reach our server`, 'error')
      }
    })
  }

  render () {
    return (
      <form id='addPurchase' onSubmit={this.handleSubmit.bind(this)}>
        <input type='text' name='shop' placeholder='Shop name' value={this.state.shop} className='primary-input' onChange={this.handleChange} />
        <input type='number' name='amount' placeholder='Amount' value={this.state.amount} className='primary-input' onChange={this.handleChange} />
          <Select
            name='buyer'
            placeholder='Buyer'
            value={this.state.buyer}
            onChange={this.handleChange.bind(this, true)}
            options={store.flatSharing.currentFlatSharingUsers.map(elmt => {
              return {
                value: elmt._id,
                label: elmt.username
              }
            })} />
        <textarea name='desc' placeholder='Description' className='primary-input' value={this.state.desc} onChange={this.handleChange} />
        <button type='submit' className='primary-btn'>Add</button>
      </form>
    )
  }
}

export default Add
