import React, { Component } from 'react';
import {HashRouter, Route, BrowserRouter} from 'react-router-dom'
import Login from './components/Login/Login'
import Dash from './components/Dash/Dash'
import Users from './components/Users/Users'
import Create from './components/Create/Create'
import Update from './components/Update/Update'
import Api from './components/Api/Api'
import {MuiThemeProvider} from 'material-ui'
import './styles/main.scss'


class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
          <BrowserRouter>

            <div>
              <div>
                  <Route path='/login' component={Login} />
                  <Route path='/dashboard' component={Dash} />
                  <Route path='/users' component={Users} />
                  <Route path='/create' component={Create} />
                  <Route path='/update/:ID' component={Update} />
                  <Route path='/api' component={Api} />
              </div>
            </div>

          </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
