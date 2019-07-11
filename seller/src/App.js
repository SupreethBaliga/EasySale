import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import AboutSeller from './AboutSeller/AboutSeller';
import ProductsList from './ProductsList/ProductsList';
import AddProduct from './AddProduct/AddProduct';
import NavBar from './NavBar/NavBar';
import ProductPage from './ProductPage/ProductPage';
import OrderCombinedView from './OrderCombinedView/OrderCombinedView';
import RequestedOrdersList from './RequestedOrdersList/RequestedOrdersList';
import RequestedOrderPage from './RequestedOrderPage/RequestedOrderPage';
import axios from 'axios';

class App extends Component {

  componentWillMount() {
    axios.get("/api/getuser")
        .then(res => {
            if(res.data == null) window.location.assign("//easysale.live/");
            else if(res.data.email!=="admin@gmail.com") window.location.assign("//easysale.live/home");
        })
        .catch(err => {
            console.log(err);
        })
  }

  render() {

    return (
      <div>
        <div className='top-nav-bar'>
          <NavBar />
        </div>
        <div className='main-div'>
          <BrowserRouter>
            <div>
              <Route exact path='/' render={(props) => <AboutSeller {...props} />} />
              <Route exact path='/seller/products' render={(props) => <ProductsList {...props}  />} />
              <Route exact path='/seller/product/:id' render={(props) => <ProductPage {...props} />} />
              <Route exact path='/addProduct' render={(props) => <AddProduct {...props} />} />
              <Route exact path='/reqorders' render={(props) => <RequestedOrdersList {...props} />} />
              <Route exact path='/reqorders/:id' render={(props) => <RequestedOrderPage {...props} />} />
              <Route path='/seller/orders' render={(props) => <OrderCombinedView {...props} />} />
            </div>
          </BrowserRouter>

        </div>
      </div>
    )
  }
}

export default App;
