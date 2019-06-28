import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import AboutSeller from './AboutSeller/AboutSeller';
// import AboutSellerEdit from './AboutSellerEdit/AboutSellerEdit';
// import ProductsList from './ProductsList/ProductsList';
import AddProduct from './AddProduct/AddProduct';

class App extends Component {
  render() {
    return (
      <div>
        <AddProduct />
      </div>
    )
  }
}

export default App;
