import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './Main.css';
import NavBar from '../NavBar/NavBar';
import AboutSeller from '../AboutSeller/AboutSeller';
import ProductListPage from '../ProductListPage/ProductListPage';
import ProductPage from '../ProductPage/ProductPage';
import CartList from '../CartList/CartList';
import FavouritesList from '../FavouritesList/FavouritesList';
import ProfilePage from '../ProfilePage/ProfilePage';
import EditProfile from '../EditProfile/EditProfile';
import OrderCombinedView from '../OrderCombinedView/OrderCombinedView';
import axios from 'axios';

class Main extends Component {

    componentWillMount() {
        axios.get("/api/getuser")
        .then(res => {
            if(res.data == null) window.location.href = '/';
            else if(res.data.email==="admin@gmail.com") window.location.assign("//seller.easysale.live/");
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
                <div className='main-view'>
                    <BrowserRouter>
                        <div>
                            <Route exact path='/home' render={(props) => <AboutSeller {...props} />} />
                            <Route exact path='/products' render={(props) => <ProductListPage {...props} />} />
                            <Route path='/product/:id' render={(props) => <ProductPage {...props} />} />
                            <Route exact path='/cart' render={(props) => <CartList {...props} />} />
                            <Route exact path='/favourites' render={(props) => <FavouritesList {...props} />} />
                            <Route exact path='/profile' render={(props) => <ProfilePage {...props} />} />
                            <Route exact path='/editprofile' render={(props) => <EditProfile {...props} />} />
                            <Route path='/myOrders' render={(props) => <OrderCombinedView />} />
                        </div>
                    </BrowserRouter>
                </div>
            </div>
        )
    }
}

export default Main;
