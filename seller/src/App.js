import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import AboutSeller from './AboutSeller/AboutSeller';
// import AboutSellerEdit from './AboutSellerEdit/AboutSellerEdit';
// import ProductsList from './ProductsList/ProductsList';
// import AddProduct from './AddProduct/AddProduct';
// import NavBar from './NavBar/NavBar';
// import ProductPage from './ProductPage/ProductPage';
import OrderCombinedView from './OrderCombinedView/OrderCombinedView';

class App extends Component {

  render() {

    return (
      <div>
        <OrderCombinedView />
      </div>
    )
  }
}

export default App;
