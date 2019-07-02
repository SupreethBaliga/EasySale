import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import Main from './Main/Main';
import LoginAndSignup from './LoginAndSignup/LoginAndSignup';
// import Login2 from './LoginAndSignup/LoginAndSignup';
class App extends Component {

  render() {

    return (
      <div>
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path='/login' render={(props) => <LoginAndSignup />} />
              <Route render={(props) => <Main />} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
