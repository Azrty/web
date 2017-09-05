import React from 'react';

import axios from '../utils/axios';

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      error: '',
      username: '',
      password: ''
    };

    this.handleKey = this.handleKey.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  componentWillMount () {
    if (global.localStorage.getItem('token')) {
      this.history.push('/basket');
    }
  }

  handleKey (event) {
    event.preventDefault();
    this.setState({[event.target.id]: event.target.value});
  }

  handleConfirm (event) {
    if (event.target.name === 'Submit' || event.key === 'Enter') {
      axios().post('/signin', {
        username: this.state.username,
        password: this.state.password
      }).then(res => {
        if (res.data.success === true) {
          if (res.data.token) {
            global.localStorage.setItem('token', res.data.token);
            this.props.history.push('/basket');
          }
        } else if (res.data.message) {
          this.setState({error: res.data.message});
        }
      }).catch(err => {
        console.log(err);
        if (err.response) {
          console.log(err.response);
          this.setState({error: err.response.data});
        }
      });
    }
  }

  render () {
    return (
      <div className='center'>
        <div className='signin'>
          {(this.state.err !== '')
          ? <span>{this.state.error}</span>
          : null}
          <input id='username' type='text' placeholder='Username'
            value={this.state.username} onChange={this.handleKey}
            onKeyPress={this.handleConfirm} /><br />
          <input id='password' type='password' placeholder='Password'
            value={this.state.password} onChange={this.handleKey}
            onKeyPress={this.handleConfirm} /><br />
          <button name='Submit' onClick={this.handleConfirm}>Signin</button>
        </div>
      </div>
    );
  }
}

export default App;
