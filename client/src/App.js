import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
//import ProductPage from './ProductPage/ProductPage';
//import ProductListPage from './ProductListPage/ProductListPage';
import OrderList from './OrderList/OrderList';
class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     defaultValue: "100",
  //     step: 100
  //   }
  // }

  props = {
    orders: [
      {
        orderNumber: 1,
        status: 'Pending',
        expectedDate: '12/6/19'
      },
      {
        orderNumber: 2,
        status: 'Processed',
        expectedDate: '10/6/19'
      },
      {
        orderNumber: 3,
        status: 'Checking',
        expectedDate: '8/6/19'
      },
      {
        orderNumber: 4,
        status: 'Dispatched',
        expectedDate: '7/6/19'
      },
      {
        orderNumber: 5,
        status: 'Delivered',
        expectedDate: '5/6/19'
      }
    ]
  }

  render() {

    let props = {
      orders: [
        {
          orderNumber: 1,
          status: 'Pending',
          expectedDate: '12/6/19'
        },
        {
          orderNumber: 2,
          status: 'Processed',
          expectedDate: '10/6/19'
        },
        {
          orderNumber: 3,
          status: 'Checking',
          expectedDate: '8/6/19'
        },
        {
          orderNumber: 4,
          status: 'Dispatched',
          expectedDate: '7/6/19'
        },
        {
          orderNumber: 5,
          status: 'Delivered',
          expectedDate: '5/6/19'
        }
      ]
    }
    return (
      <div>
        <OrderList {...props} />
      </div>
    )
  }
}

export default App;
