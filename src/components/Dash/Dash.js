import React, { Component } from 'react'
import {Link, Switch} from 'react-router-dom'


export default class Dash extends Component {
  render() {
    return (
      <div>
        This is the dashboard
        <Switch>
               <div className='main'>
                    <Link to='/dashboard'>Dashboard </Link>
                    <Link to='/users'>Users </Link>
                    <Link to='/create'>Create New Item </Link>
                    <Link to='/Update'>Update Item</Link>
               </div> 
            </Switch>
      </div>
    )
  }
}
