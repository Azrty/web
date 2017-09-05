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
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount () {
    if (!global.localStorage.getItem('token')) {
      this.props.history.push('/');
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
            this.props.history.push('/');
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
        axios().get('/coloc/purchases')
        .then(res => {
          if (res.data.success === true) Store.setStore(res.data.purchases);
        })
        .catch(err => {
          console.log(err);
          if (err.response) {
            if (err.response.status === 401) {
              global.localStorage.removeItem('token');
              this.props.history.push('/');
            }
          }
        });
        this.setState({
          newPurchase: false
        });
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

  handleLogout (event) {
    event.preventDefault();
    global.localStorage.removeItem('token');
    this.props.history.push('/')
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
                { Store.shops.map(elem => <option key={Math.random()} value={elem} />) }
              </datalist>
              <input id='price' type='number' placeholder='Price' onChange={this.handleChange} onKeyPress={this.handleConfirm} /><br />
              <textarea id='description' placeholder='Description' onChange={this.handleChange} onKeyPress={this.handleConfirm} /><br />
              <button name='Submit' onClick={this.handleConfirm}>Add purchase</button>
            </div>
          </div>}
          { (!this.state.newPurchase)
          ? <div className='new_purchase_button' onClick={this.newPurchase}>
            <svg viewBox='0 0 24 24'>
              <path fill='#2c3e50' d='M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z' />
            </svg>
          </div>
          : <div className='new_purchase_button' onClick={this.newPurchase}>
            <svg viewBox='0 0 24 24'>
              <path fill='#2c3e50' d='M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z' />
            </svg>
          </div> }
          <div className='logout_button' onClick={this.handleLogout}>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="50px" y="50px"
              viewBox="0 0 55 55">
              <g fill='#2c3e50' >
                <path d="M53.924,23.618c-0.051-0.123-0.125-0.234-0.217-0.327L41.708,11.293c-0.391-0.391-1.023-0.391-1.414,0
                  s-0.391,1.023,0,1.414L50.587,23H29.001c-0.553,0-1,0.447-1,1s0.447,1,1,1h21.586L40.294,35.293c-0.391,0.391-0.391,1.023,0,1.414
                  C40.489,36.902,40.745,37,41.001,37s0.512-0.098,0.707-0.293l11.999-11.999c0.093-0.092,0.166-0.203,0.217-0.326
                  C54.025,24.138,54.025,23.862,53.924,23.618z"/>
                <path d="M36.001,29c-0.553,0-1,0.447-1,1v16h-10V8c0-0.436-0.282-0.821-0.697-0.953L8.442,2h26.559v16c0,0.553,0.447,1,1,1
                  s1-0.447,1-1V1c0-0.553-0.447-1-1-1h-34c-0.032,0-0.06,0.015-0.091,0.018C1.854,0.023,1.805,0.036,1.752,0.05
                  C1.658,0.075,1.574,0.109,1.493,0.158C1.467,0.174,1.436,0.174,1.411,0.192C1.38,0.215,1.356,0.244,1.328,0.269
                  c-0.017,0.016-0.035,0.03-0.051,0.047C1.201,0.398,1.139,0.489,1.093,0.589c-0.009,0.02-0.014,0.04-0.022,0.06
                  C1.029,0.761,1.001,0.878,1.001,1v46c0,0.125,0.029,0.243,0.072,0.355c0.014,0.037,0.035,0.068,0.053,0.103
                  c0.037,0.071,0.079,0.136,0.132,0.196c0.029,0.032,0.058,0.061,0.09,0.09c0.058,0.051,0.123,0.093,0.193,0.13
                  c0.037,0.02,0.071,0.041,0.111,0.056c0.017,0.006,0.03,0.018,0.047,0.024l22,7C23.797,54.984,23.899,55,24.001,55
                  c0.21,0,0.417-0.066,0.59-0.192c0.258-0.188,0.41-0.488,0.41-0.808v-6h11c0.553,0,1-0.447,1-1V30
                  C37.001,29.447,36.553,29,36.001,29z"/>
              </g>    
            </svg>
          </div>
          <div className='history_button' onClick={() => {this.props.history.push('/history')}}>
          <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
          viewBox="0 0 500 500">
            <g fill='#2c3e50' >
              <path d="M458.091,128.116v326.842c0,26.698-21.723,48.421-48.422,48.421h-220.92c-26.699,0-48.421-21.723-48.421-48.421V242.439
                c6.907,1.149,13.953,1.894,21.184,1.894c5.128,0,10.161-0.381,15.132-0.969v211.594c0,6.673,5.429,12.104,12.105,12.104h220.92
                c6.674,0,12.105-5.432,12.105-12.104V128.116c0-6.676-5.432-12.105-12.105-12.105H289.835c0-12.625-1.897-24.793-5.297-36.315
                h125.131C436.368,79.695,458.091,101.417,458.091,128.116z M159.49,228.401c-62.973,0-114.202-51.229-114.202-114.199
                C45.289,51.229,96.517,0,159.49,0c62.971,0,114.202,51.229,114.202,114.202C273.692,177.172,222.461,228.401,159.49,228.401z
                M159.49,204.19c49.618,0,89.989-40.364,89.989-89.988c0-49.627-40.365-89.991-89.989-89.991
                c-49.626,0-89.991,40.364-89.991,89.991C69.499,163.826,109.87,204.19,159.49,204.19z M227.981,126.308
                c6.682,0,12.105-5.423,12.105-12.105s-5.423-12.105-12.105-12.105h-56.386v-47.52c0-6.682-5.423-12.105-12.105-12.105
                s-12.105,5.423-12.105,12.105v59.625c0,6.682,5.423,12.105,12.105,12.105H227.981z M367.697,224.456h-131.14
                c-6.682,0-12.105,5.423-12.105,12.105c0,6.683,5.423,12.105,12.105,12.105h131.14c6.685,0,12.105-5.423,12.105-12.105
                C379.803,229.879,374.382,224.456,367.697,224.456z M367.91,297.885h-131.14c-6.682,0-12.105,5.42-12.105,12.105
                s5.423,12.105,12.105,12.105h131.14c6.685,0,12.104-5.42,12.104-12.105S374.601,297.885,367.91,297.885z M367.91,374.353h-131.14
                c-6.682,0-12.105,5.426-12.105,12.105c0,6.685,5.423,12.104,12.105,12.104h131.14c6.685,0,12.104-5.42,12.104-12.104
                C380.015,379.778,374.601,374.353,367.91,374.353z"/>
            </g>    
          </svg>
        </div>
        </div>
      </div>
    );
  }
}

export default App;
