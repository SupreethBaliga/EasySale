import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
// import ProductListPage from './ProductListPage/ProductListPage';
// import CartList from './CartList/CartList';
// import FavouritesList from './FavouritesList/FavouritesList';
// import OrderPage from './OrderPage/OrderPage';
// import ProfilePage from './ProfilePage/ProfilePage';
// import LoginAndSignup from './LoginAndSignup/LoginAndSignup';
import AboutSeller from './AboutSeller/AboutSeller';
import NavBar from './NavBar/NavBar';
// import OrderCombinedView from './OrderCombinedView/OrderCombinedView';
class App extends Component() {

  // Tasks left:
  // 1. Making OrderCombinedView ...Done
  // 2. Making Auth Page ...Done
  // 3. Linking ProductList to ProductPage (First API needed)s

  render() {


    return (
      <div>
        <div className='top-nav-bar'>
          <NavBar />
        </div>
        <div className='main-view'>
          <BrowserRouter>
            <div>
              <Route exact path='/' render={(props) => <AboutSeller {...props} />} />
              {/*<Route exact path='/products' render={(props) => <ProductListPage {...props} {...prodprops} />} />
              <Route path='/product/:id' render={(props) => <ProductPage {...props} {...productPageProps} />} />
              <Route exact path='/cart' render={(props) => <CartList {...props} {...cart} />} />
              <Route exact path='/favourites' render={(props) => <FavouritesList {...props} {...favs} />} />
              <Route exact path='/profile' render={(props) => <ProfilePage {...props} {...profile} />} />
              <Route exact path='/editprofile' render={(props) => <EditProfile {...props} {...profile} />} />
              <Route path='/myOrders' render={(props) => <OrderCombinedView />} />*/}
            </div>
          </BrowserRouter>
        </div>
      </div>
    )
  }
}

export default App;
