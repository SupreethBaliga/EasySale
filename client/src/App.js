import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Main from './Main/Main';
import LoginAndSignup from './LoginAndSignup/LoginAndSignup';

class App extends Component {

  render() {

    return (
      <div>
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path='/' render={(props) => <LoginAndSignup {...props} />} />
              <Route render={(props) => <Main {...props}/>} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
