import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import AboutSeller from './AboutSeller/AboutSeller';
import AboutSellerEdit from './AboutSellerEdit/AboutSellerEdit';
import ProductsList from './ProductsList/ProductsList';
import AddProduct from './AddProduct/AddProduct';
import NavBar from './NavBar/NavBar';
import ProductPage from './ProductPage/ProductPage';
import OrderCombinedView from './OrderCombinedView/OrderCombinedView';
import RequestedOrdersList from './RequestedOrdersList/RequestedOrdersList';
import RequestedOrderPage from './RequestedOrderPage/RequestedOrderPage';

class App extends Component {

  render() {

    // let prodprops = {
    //   products: [
    //     {
    //       id: 1,
    //       name: "Prod1",
    //       description: "This is product 1. Enter some more description about it so that it looks as big as 4 to 5 lines. This is what I am trying to do right now but it doesn't seem to work. Keep on seeing. Still seeing. And still see.",
    //       image: require('./assets/images/prod1.jpeg'),
    //       rate: 4,
    //       defaultQuantity: 100
    //     },
    //     {
    //       id: 2,
    //       name: "Prod2",
    //       description: "This is product 2. Enter some more description about it so that it looks as big as 4 to 5 lines. This is what I am trying to do right now but it doesn't seem to work. Keep on seeing. Still seeing. And still see.",
    //       image: require('./assets/images/prod2.jpeg'),
    //       rate: 6,
    //       defaultQuantity: 120
    //     },
    //     {
    //       id: 3,
    //       name: "Prod3",
    //       description: "This is product 3. Enter some more description about it so that it looks as big as 4 to 5 lines. This is what I am trying to do right now but it doesn't seem to work. Keep on seeing. Still seeing. And still see.",
    //       image: require('./assets/images/prod3.jpeg'),
    //       rate: 5,
    //       defaultQuantity: 100
    //     },
    //     {
    //       id: 4,
    //       name: "Prod4",
    //       description: "This is product 4. Enter some more description about it so that it looks as big as 4 to 5 lines. This is what I am trying to do right now but it doesn't seem to work. Keep on seeing. Still seeing. And still see.",
    //       image: require('./assets/images/prod4.jpeg'),
    //       rate: 9,
    //       defaultQuantity: 50
    //     },
    //     {
    //       id: 5,
    //       name: "Prod5",
    //       description: "This is product 5. Enter some more description about it so that it looks as big as 4 to 5 lines. This is what I am trying to do right now but it doesn't seem to work. Keep on seeing. Still seeing. And still see.",
    //       image: require('./assets/images/prod5.jpeg'),
    //       rate: 7,
    //       defaultQuantity: 130
    //     }
    //   ]
    // }

    let reqProps = {
      orders: [
        {
          uniqueId: '12340901',
          orgName: 'Supreeth Baliga Paper Products And Materials',
          orderedOn: '12/4/12',
          deliveryAddress: 'C204, Manavsthal Heights, Off Military Road, Andheri',
          orderDetails: {
            productId: ['12321421', '12332145', '16453', '2356', '2543'],
            productName: ['Product1', 'Product2', 'Product3', 'Product4', 'Product5'],
            rate: [10, 20, 30, 35, 5],
            quantity: [150, 200, 100, 50, 250]
          },
          total: 12323
        },
        {
          uniqueId: '12340901',
          orgName: 'Supreeth Baliga',
          orderedOn: '12/4/12',
          deliveryAddress: 'C204, Manavsthal Heights, Off Military Road, Andheri',
          orderDetails: {
            productId: ['12321421', '12332145', '16453', '2356', '2543'],
            productName: ['Product1', 'Product2', 'Product3', 'Product4', 'Product5'],
            rate: [10, 20, 30, 35, 5],
            quantity: [150, 200, 100, 50, 250]
          },
          total: 12323
        },
        {
          uniqueId: '12340901',
          orgName: 'Supreeth Baliga',
          orderedOn: '12/4/12',
          deliveryAddress: 'C204, Manavsthal Heights, Off Military Road, Andheri',
          orderDetails: {
            productId: ['12321421', '12332145', '16453', '2356', '2543'],
            productName: ['Product1', 'Product2', 'Product3', 'Product4', 'Product5'],
            rate: [10, 20, 30, 35, 5],
            quantity: [150, 200, 100, 50, 250]
          },
          total: 12323
        },
        {
          uniqueId: '12340901',
          orgName: 'Supreeth Baliga',
          orderedOn: '12/4/12',
          deliveryAddress: 'C204, Manavsthal Heights, Off Military Road, Andheri',
          orderDetails: {
            productId: ['12321421', '12332145', '16453', '2356', '2543'],
            productName: ['Product1', 'Product2', 'Product3', 'Product4', 'Product5'],
            rate: [10, 20, 30, 35, 5],
            quantity: [150, 200, 100, 50, 250]
          },
          total: 12323
        }
      ]
    }

    let reqPageProps = {
      uniqueId: '12340901',
      orgName: 'Supreeth Baliga Paper Products And Materials',
      orderedOn: '12/4/12',
      contactNo: '9879765123',
      orgEmail: 'supreethbaliga@gmail.com',
      deliveryAddress: 'C204, Manavsthal Heights, Off Military Road, Andheri',
      orderDetails: {
        productId: ['12321421', '12332145', '16453', '2356', '2543'],
        productName: ['Product1', 'Product2', 'Product3', 'Product4', 'Product5'],
        rate: [10, 20, 30, 35, 5],
        quantity: [150, 200, 100, 50, 250]
      },
      total: 12323
    }

    let productPageProps = {
      rate: 4,
      productId: "oi2j812u082u4",
      imageLink: require('./assets/images/prod5.jpeg'),
      content: "woihjwiorhe1 uwhdouqh qiehqw oiqheioqhe qoiehiqowhe oqihweio iiqheioqhe qioeqiowje oqehqwioheioqh ohqroihwrhqiorh",
      productTitle: "Prod5",
      step: 100,
      defaultValue: 100
    }

    return (
      <div>
        <div className='top-nav-bar'>
          <NavBar />
        </div>
        <div className='main-div'>
          <BrowserRouter>
            <div>
              <Route exact path='/' render={(props) => <AboutSeller {...props} />} />
              <Route exact path='/editAboutSeller' render={(props) => <AboutSellerEdit {...props} />} />
              <Route exact path='/seller/products' render={(props) => <ProductsList {...props}  />} />
              <Route exact path='/seller/product/:id' render={(props) => <ProductPage {...props} {...productPageProps} />} />
              <Route exact path='/addProduct' render={(props) => <AddProduct {...props} />} />
              <Route exact path='/reqorders' render={(props) => <RequestedOrdersList {...props} {...reqProps} />} />
              <Route exact path='/reqorders/:id' render={(props) => <RequestedOrderPage {...props} {...reqPageProps} />} />
              <Route path='/seller/orders' render={(props) => <OrderCombinedView {...props} />} />
            </div>
          </BrowserRouter>

        </div>
      </div>
    )
  }
}

export default App;
