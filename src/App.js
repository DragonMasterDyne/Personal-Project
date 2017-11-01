import React, { Component } from 'react';
import {HashRouter, Route} from 'react-router-dom'
import Login from './components/Login/Login'
import Dash from './components/Dash/Dash'
import Users from './components/Users/Users'
import Create from './components/Create/Create'
import Update from './components/Update/Update'
import './styles/main.scss'


class App extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <div>
              <Route path='/' exact component={Login} />
              <Route path='/dashboard' component={Dash} />
              <Route path='/users' component={Users} />
              <Route path='/create' component={Create} />
              <Route path='/update' component={Update} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
