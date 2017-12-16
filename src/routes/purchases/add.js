import React, { Component } from 'react'

class Add extends Component {
  constructor (props) {
    super(props)

    this.state = {
      shop: '',
      amount: '',
      buyer: '',
      desc: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    if (e.target.name === 'amount') return this.setState({ [e.target.name]: parseFloat(e.target.value) })
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit (e) {
    e.preventDefault()
    console.log('Handle submit')
  }

  render () {
    return (
      <form id='addPurchase' onSubmit={this.handleSubmit}>
        <input type='text' name='shop' placeholder='Shop name' value={this.state.shop} className='primary-input' onChange={this.handleChange} />
        <input type='number' name='amount' placeholder='Amount' value={this.state.amount.toString()} className='primary-input' onChange={this.handleChange} />
        <input type='text' name='buyer' placeholder='Buyer' value={this.state.buyer} className='primary-input' onChange={this.handleChange} />
        <textarea name='desc' placeholder='Description' className='primary-input' value={this.state.desc} onChange={this.handleChange} />
        <button type='submit' className='primary-btn'>Add</button>
      </form>
    )
  }
}

export default Add
