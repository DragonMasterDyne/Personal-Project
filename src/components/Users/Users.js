import React, { Component } from 'react'
import Header from '../Header/Header'
import axios from 'axios'
import {connect} from 'react-redux'
import {getUsers} from '../../ducks/reducer'


class Users extends Component {
  constructor(props){
    super(props);


  }

  componentDidMount() {
    this.props.getUsers()
  }



  render() {

    console.log(this.props.users)
    const allUsers = this.props.users ? 
      this.props.users.map((u,i) => {
        return (
<div className='current-users' key={i} >
              <p className='user-name'>Name:</p>
              <input className='user-input1' value={this.props[i].name} type="text"/>
              <p className='user-email'>Email:</p>
              <input className='user-input2' value={this.props[i].email} type="text"/>
              <button className='user-remove'></button>
            </div>
        )
      }) : <div className='current-users'></div>;

    return (
      <div className='user-main'>
        <Header/>
        <div className='users-main'>
          <h2 className='users-title'>Manage Users</h2>
          <div className='users-box'>
            {allUsers}
            <div className='divider'></div>
            <div className='add-users'></div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.users
  }
}

export default connect(mapStateToProps, {getUsers})(Users)