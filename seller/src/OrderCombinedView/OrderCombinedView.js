import React, { Component } from 'react';
import './OrderCombinedView.css';
import OrderList from '../OrderList/OrderList';
import OrderPage from '../OrderPage/OrderPage';
import { BrowserRouter, Route } from 'react-router-dom';

class OrderCombinedView extends Component {

    render() {

        return (
            <div className='col-md-12'>
                <div className='row'>
                    <div className='col-md-3 order-list-main'>
                        <OrderList />
                    </div>
                    <div className='col-md-9' id='order-page-frame'>
                        <BrowserRouter>
                            <Route exact path='/seller/orders' render={(props) => <OrderPage {...props} />} />
                            <Route exact path='/seller/orders/:orderId' render={(props) => <OrderPage {...props} />} />
                        </BrowserRouter>
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderCombinedView;
