import React, { Component } from 'react'
import HLogo from '../assets/H-icon.png'

export default class Login extends Component {
  render() {

    const params = new URLSearchParams(this.props.location.search);
    const access = params.get('access');

    console.log(params)
    if (access === 'unauthorized'){
      alert('You are not authorized')
    }
    return (
      <div className='main'>
        <div className='logo' >
            <img src={HLogo} alt=""/>
            <h2>INVENTORY</h2>
        </div>
        <div>
            <a href={process.env.REACT_APP_LOGIN}>
                <button className='login-button' >Login</button>
            </a>
        </div>

      </div>
    )
  }
}
