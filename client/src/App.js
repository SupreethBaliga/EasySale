import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import ProductPage from './ProductPage/ProductPage';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultValue: "100",
      step: 100
    }
  }

  render() {
    //this.state = this.state.bind(this);
    let props = {
      /*defaultValue: this.state.defaultValue,
      step: this.state.step,
      rate: 4*/
    }
    return (
      <div className="App">
        {/*Enter the name of the component you want to render.*/}
      </div>
    )
  }
}

export default App;
