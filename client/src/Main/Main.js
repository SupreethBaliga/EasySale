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

class Main extends Component {
    render() {

        let prodprops = {
            products: [
                {
                    id: 1,
                    name: "Prod1",
                    description: "This is product 1. Enter some more description about it so that it looks as big as 4 to 5 lines. This is what I am trying to do right now but it doesn't seem to work. Keep on seeing. Still seeing. And still see.",
                    image: require('../assets/images/prod1.jpeg'),
                    rate: 4,
                    defaultQuantity: 100
                },
                {
                    id: 2,
                    name: "Prod2",
                    description: "This is product 2. Enter some more description about it so that it looks as big as 4 to 5 lines. This is what I am trying to do right now but it doesn't seem to work. Keep on seeing. Still seeing. And still see.",
                    image: require('../assets/images/prod2.jpeg'),
                    rate: 6,
                    defaultQuantity: 120
                },
                {
                    id: 3,
                    name: "Prod3",
                    description: "This is product 3. Enter some more description about it so that it looks as big as 4 to 5 lines. This is what I am trying to do right now but it doesn't seem to work. Keep on seeing. Still seeing. And still see.",
                    image: require('../assets/images/prod3.jpeg'),
                    rate: 5,
                    defaultQuantity: 100
                },
                {
                    id: 4,
                    name: "Prod4",
                    description: "This is product 4. Enter some more description about it so that it looks as big as 4 to 5 lines. This is what I am trying to do right now but it doesn't seem to work. Keep on seeing. Still seeing. And still see.",
                    image: require('../assets/images/prod4.jpeg'),
                    rate: 9,
                    defaultQuantity: 50
                },
                {
                    id: 5,
                    name: "Prod5",
                    description: "This is product 5. Enter some more description about it so that it looks as big as 4 to 5 lines. This is what I am trying to do right now but it doesn't seem to work. Keep on seeing. Still seeing. And still see.",
                    image: require('../assets/images/prod5.jpeg'),
                    rate: 7,
                    defaultQuantity: 130
                }
            ]
        }

        let productPageProps = {
            rate: 4,
            productId: "oi2j812u082u4",
            imageLink: require('../assets/images/prod5.jpeg'),
            content: "woihjwiorhe1 uwhdouqh qiehqw oiqheioqhe qoiehiqowhe oqihweio iiqheioqhe qioeqiowje oqehqwioheioqh ohqroihwrhqiorh",
            productTitle: "Prod5",
            step: 100,
            defaultValue: 100
        }

        let cart = {
            cartListItems: [
                {
                    productName: 'Product1',
                    productId: '124jfwoq',
                    imageUrl: require('../assets/images/prod1.jpeg'),
                    quantity: 100,
                    rate: 23,
                    step: 100,
                    defaultQuantity: 100
                },
                {
                    productName: 'Product2',
                    productId: '124j441oq',
                    imageUrl: require('../assets/images/prod2.jpeg'),
                    quantity: 34,
                    rate: 12,
                    step: 23,
                    defaultQuantity: 20
                }, {
                    productName: 'Product3',
                    productId: '124jfw642',
                    imageUrl: require('../assets/images/prod3.jpeg'),
                    quantity: 87,
                    rate: 12,
                    step: 50,
                    defaultQuantity: 200
                }, {
                    productName: 'Product4',
                    productId: '2343jfwoq',
                    imageUrl: require('../assets/images/prod4.jpeg'),
                    quantity: 12,
                    rate: 10,
                    step: 200,
                    defaultQuantity: 150
                }, {
                    productName: 'Product5',
                    productId: '124j890',
                    imageUrl: require('../assets/images/prod5.jpeg'),
                    quantity: 123,
                    rate: 9,
                    step: 100,
                    defaultQuantity: 50
                }
            ]
        }

        let favs = {
            products: [
                {
                    id: 1,
                    name: "Prod1",
                    description: "This is product 1. Enter some more description about it so that it looks as big as 4 to 5 lines. This is what I am trying to do right now but it doesn't seem to work. Keep on seeing. Still seeing. And still see.",
                    image: require('../assets/images/prod1.jpeg'),
                    rate: 4,
                    defaultQuantity: 100
                },
                {
                    id: 2,
                    name: "Prod2",
                    description: "This is product 2. Enter some more description about it so that it looks as big as 4 to 5 lines. This is what I am trying to do right now but it doesn't seem to work. Keep on seeing. Still seeing. And still see.",
                    image: require('../assets/images/prod2.jpeg'),
                    rate: 6,
                    defaultQuantity: 120
                },
                {
                    id: 3,
                    name: "Prod3",
                    description: "This is product 3. Enter some more description about it so that it looks as big as 4 to 5 lines. This is what I am trying to do right now but it doesn't seem to work. Keep on seeing. Still seeing. And still see.",
                    image: require('../assets/images/prod3.jpeg'),
                    rate: 5,
                    defaultQuantity: 100
                },
                {
                    id: 4,
                    name: "Prod4",
                    description: "This is product 4. Enter some more description about it so that it looks as big as 4 to 5 lines. This is what I am trying to do right now but it doesn't seem to work. Keep on seeing. Still seeing. And still see.",
                    image: require('../assets/images/prod4.jpeg'),
                    rate: 9,
                    defaultQuantity: 50
                },
                {
                    id: 5,
                    name: "Prod5",
                    description: "This is product 5. Enter some more description about it so that it looks as big as 4 to 5 lines. This is what I am trying to do right now but it doesn't seem to work. Keep on seeing. Still seeing. And still see.",
                    image: require('../assets/images/prod5.jpeg'),
                    rate: 7,
                    defaultQuantity: 130
                }
            ]
        }

        let profile = {
            customerName: 'Dipesh Khandelwal',
            orgName: 'Khandelwal Paper Products',
            gstNo: '12345678f0b23a5',
            landlineCode: '0141',
            landlineNumber: '24102729',
            mobileNumber: '9879649801',
            email: 'abcd@efgh.com',
            companyAddr: '1-D-93, Lalita Shastri Nagar, Jaipur',
            deliveryAddr: 'C204, Manavsthal Heights, Off Military Road, Andheri-(E), Mumbai',
            companyPostalCode: '789162',
            deliveryPostalCode: '400072'
        }

        return (
            <div>
                <div className='top-nav-bar'>
                    <NavBar />
                </div>
                <div className='main-view'>
                    <BrowserRouter>
                        <div>
                            <Route exact path='/' render={(props) => <AboutSeller {...props} />} />
                            <Route exact path='/products' render={(props) => <ProductListPage {...props} {...prodprops} />} />
                            <Route path='/product/:id' render={(props) => <ProductPage {...props} {...productPageProps} />} />
                            <Route exact path='/cart' render={(props) => <CartList {...props} {...cart} />} />
                            <Route exact path='/favourites' render={(props) => <FavouritesList {...props} {...favs} />} />
                            <Route exact path='/profile' render={(props) => <ProfilePage {...props} {...profile} />} />
                            <Route exact path='/editprofile' render={(props) => <EditProfile {...props} {...profile} />} />
                            <Route path='/myOrders' render={(props) => <OrderCombinedView />} />
                        </div>
                    </BrowserRouter>
                </div>
            </div>
        )
    }
}

export default Main;