import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import HLogo from './H-icon.png'

export default class Login extends Component {
  render() {
    return (
      <div className='main'>
        <div className='logo' >
            <img src={HLogo} alt=""/>
            <h2>INVENTORY</h2>
        </div>
        <div className='login-input'>
            <input type="text"/>
            <input type="text"/>
        </div>
        <div className='' >
            <Link to='/dashboard' >
            <button className='login-button' >Login</button>
            </Link>
        </div>

      </div>
    )
  }
}
