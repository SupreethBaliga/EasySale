import React, { Component } from 'react';
import './CheckoutPage.css';

class CheckoutPage extends Component {
    render() {
        return (
            <div className='main-card card'>
                <div className='container m-5'>
                    Your Order has been sent to the seller for review.<br /> Please pay the advanced fees once your order is confirmed.
                </div>
                <div>
                    <button className='btn btn-link'>&lt;&lt; Go To MyOrders</button>
                </div>
            </div>
        );
    }
}

export default CheckoutPage;