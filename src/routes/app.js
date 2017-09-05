import React from 'react';
import { observer } from 'mobx-react';
import logo from '../images/logo.svg';

import Graph from '../components/graph.js';

import axios from '../utils/axios.js';
import Store from '../utils/store.js';

@observer
class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      newPurchase: false,
      shop: '',
      price: 0,
      description: '',
    };

    this.newPurchase = this.newPurchase.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  componentWillMount () {
    if (!global.localStorage.getItem('token')) {
      this.props.history.push('/login');
    } else {
      axios().get('/coloc/purchases')
      .then(res => {
        if (res.data.success === true) Store.setStore(res.data.purchases);
      })
      .catch(err => {
        console.log(err);
        if (err.response) {
          if (err.response.status === 401) {
            global.localStorage.removeItem('token');
            this.props.history.push('/login');
          }
        }
      });
    }
  }

  newPurchase (event) {
    event.preventDefault();
    this.setState((previousState, props) => {
      return {newPurchase: !previousState.newPurchase};
    });
  }

  handleConfirm (event) {
    if (event.target.name === 'Submit' || event.key === 'Enter') {
      axios().post('/coloc/purchases', {
        shop: this.state.shop,
        amount: this.state.price,
        description: this.state.description
      }).then(res => {
        this.setState({
          newPurchase: false
        });
        console.log(res);
      }).catch(err => {
        if (err.response) {
          console.log(err.response);
        }
      });
    }
  }

  handleChange (event) {
    this.setState({[event.target.id]: event.target.value});
  }

  render () {
    return (
      <div className='root'>
        <nav>
          <div>
            <img src={logo} alt='logo' />
          </div>
        </nav>
        <div className='center'>
          { (!this.state.newPurchase)
          ? <Graph />
          : <div className='new_purchase'>
            <div className='new_purchase'>
              <input id='shop' placeholder='Shop' list='shops' onChange={this.handleChange} onKeyPress={this.handleConfirm} />
              <datalist id='shops'>
                {
                  Store.shops.map(elem => <option key={Math.random()} value={elem} />)
                }
              </datalist>
              <input id='price' type='number' placeholder='Price' onChange={this.handleChange} onKeyPress={this.handleConfirm} /><br />
              <textarea id='description' placeholder='Description' onChange={this.handleChange} onKeyPress={this.handleConfirm} /><br />
              <button name='Submit' onClick={this.handleConfirm}>Add purchase</button>
            </div>
          </div>}
          { (!this.state.newPurchase)
          ? <div className='new_purchase_button' onClick={this.newPurchase.bind(this)}>
            <svg viewBox='0 0 24 24'>
              <path fill='#2c3e50' d='M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z' />
            </svg>
          </div>
          : <div className='new_purchase_button' onClick={this.newPurchase.bind(this)}>
            <svg viewBox='0 0 24 24'>
              <path fill='#2c3e50' d='M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z' />
            </svg>
          </div>
          }
        </div>
      </div>
    );
  }
}

export default App;
