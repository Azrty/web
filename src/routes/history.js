import React from 'react';
import { observer } from 'mobx-react';
import logo from '../images/logo.svg';

import Moment from 'react-moment'

import axios from '../utils/axios';
import Store from '../utils/store.js';

@observer
class History extends React.Component {
  constructor (props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
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

  handleLogout (event) {
    event.preventDefault();
    global.localStorage.removeItem('token');
    this.props.history.push('/')
  }

  handleDelete (event) {
    if (event.target.name === 'Submit' || event.key === 'Enter') {

    }
  }

  render () {
    return (
      <div className='root'>
        <nav>
          <div>
            <img src={logo} alt='logo' />
          </div>
        </nav>
        <div className='history'>
          {Store.purchases.map(purchase => {
            return (
              <div key={purchase._id} id={purchase._id} className='purchase'>
                <p>{purchase.username}</p>
                <p>{purchase.shop}</p>
                <p>{purchase.amount.toFixed(2)}</p>
                <p>{purchase.description}</p>
                <p><Moment fromNow date={new Date(purchase.date)} /></p>
                <button onClick={() => {
                  axios().delete(`/coloc/purchases/${purchase._id}`).then(res => {
                    if (res.data.success === true) {
                      Store.deleteItem(purchase._id)
                    }
                  }).catch(err => console.log(err.response))
                }}>Delete</button>
              </div>
            );
          })}
        </div>
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
        <div className='history_button' onClick={() => {this.props.history.push('/basket')}}>
          <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
            viewBox="0 0 500 500">
            <g fill='#2c3e50'>
              <path d="M499.904,456.607H12.096C5.415,456.607,0,462.022,0,468.703c0,6.679,5.415,12.096,12.096,12.096h487.808
                c6.679,0,12.096-5.417,12.096-12.096C512,462.023,506.585,456.607,499.904,456.607z"/>
            </g>
            <g fill='#2c3e50'>
              <path d="M468.37,88.305h-84.948c-6.679,0-12.096,5.417-12.096,12.096v82.24h-60.757V43.297c0-6.679-5.417-12.096-12.096-12.096
                h-84.95c-6.679,0-12.096,5.417-12.096,12.096v228.882h-60.757V169.36c0-6.681-5.417-12.096-12.096-12.096H43.626
                c-6.681,0-12.096,5.415-12.096,12.096v231.563c0,6.681,5.417,12.096,12.096,12.096h84.948h84.948h84.95h84.949h84.948
                c6.681,0,12.096-5.417,12.096-12.096V100.401C480.466,93.722,475.051,88.305,468.37,88.305z M116.479,388.827H55.722V181.456
                h60.757V388.827z M201.429,388.827h-60.757v-92.456h60.757V388.827z M286.378,194.737v194.09H225.62V55.393h60.758V194.737z
                M371.328,388.827h-60.757V206.833h60.757V388.827z M456.276,388.827H395.52v-194.09v-82.24h60.757V388.827z"/>
            </g>
          </svg>
        </div>
      </div>
    );
  }
}

export default History;
