import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
//import ProductPage from './ProductPage/ProductPage';
//import ProductListPage from './ProductListPage/ProductListPage';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultValue: "100",
      step: 100
    }
  }

  render() {
    return (
      <div>
        Hello
      </div>
    )
  }
}

export default App;
