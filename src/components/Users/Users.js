import React, { Component } from 'react'
import Header from '../Header/Header'
import axios from 'axios'
import {connect} from 'react-redux'
import {getUsers, handleClickCreateUser} from '../../ducks/reducer'


class Users extends Component {
constructor(){
  super();

  this.handleClickRemove = this.handleClickRemove.bind(this)
}

  
  componentDidMount() {
    this.props.getUsers()
  }

  handleClickRemove(email){
    console.log('this is e', email)
    const answer = window.confirm('Are you sure you want to remove this user?')
    if(answer){
      axios.delete(`http://localhost:3535/delete/user/${email}`)
    } else {
      return null
    }
  }

  render() {

    console.log(this.props.users)
    const allUsers = this.props.users ? 
      this.props.users.map((u,i) => {
        return (
            <div className='current-users2' key={i}>
              <p className='user-name'>Name:</p>
              <input className='user-input1' disabled='true' value={this.props.users[i].name} type="text"/>
              <p className='user-email'>Email:</p>
              <input className='user-input2' disabled='true' value={this.props.users[i].email} type="text"/>
              <button onClick={() => this.handleClickRemove(this.props.users[i].email)} className='user-remove'><img src="http://downloadicons.net/sites/default/files/trash-can-icon-61364.png" alt=""/></button>
            </div>
        )
      }) : <div className='current-users'></div>;

    return (
      <div className='user-main'>
        <Header/>
        <div className='users-main'>
          <h2 className='users-title'>Manage Users</h2>
          <div className='users-box'>
          <div className='current-users'>{allUsers}</div>
            <div className='divider'></div>
            <div className='add-users'>
              <h2 className='newUser-title'>Create New User</h2>
              <div className='text-row'>
                <p className='newUser-text'>Name:</p>
                <input ref='name' className='newUser-input' type="text"/>
              </div>
              <div className='text-row'>
                <p className='newUser-text'>Email:</p>
                <input ref='email' className='newUser-input' type="text"/>
              </div>
              <button onClick={() => this.props.handleClickCreateUser({name: this.refs.name.value, email: this.refs.email.value})} className='user-button'>Create New User</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {
    users: state.users,
    name: state.userName,
    email: state.userEmail
  }
}

export default connect(mapStateToProps, {getUsers, handleClickCreateUser})(Users)