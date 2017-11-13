import React, { Component } from 'react'
import {Link, Switch} from 'react-router-dom'


export default class Header extends Component {
  render() {
    return (
      <div>
        <div className='main-header' >
          <img className='img-header' src='http://www.clker.com/cliparts/P/e/Z/Q/a/m/white-letter-h-md.png' alt=""/>
          <a href="/login"><button className='logout-button' >LOGOUT</button></a>
        </div>
      <Switch>
            <div className='navbar'>
                <Link className='links' to='/dashboard'>Dashboard </Link>
                <Link className='links' to='/users'>Users </Link>
                <Link className='links' to='/create'>Create New Item </Link>
                <Link className='links' to='/api'>Search Api </Link>
            </div> 
     </Switch>
      </div>
    )
  }
}
