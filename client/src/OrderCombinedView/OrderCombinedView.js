import React, { Component } from 'react';
import './OrderCombinedView.css';
import OrderList from '../OrderList/OrderList';
import OrderPage from '../OrderPage/OrderPage';
import { BrowserRouter, Route } from 'react-router-dom';

class OrderCombinedView extends Component {


    render() {

        let orderPageProps = {
            orderId: '2341231',
            orderedOnDate: '12/3/2019',
            expectedByDate: '20/3/2019',
            statusOfOrder: 'Payment Pending',
            productId: ['12321421', '12332145', '16453', '2356', '2543'],
            productName: ['Product1', 'Product2', 'Product3', 'Product4', 'Product5'],
            rate: [10, 20, 30, 35, 5],
            quantity: [150, 200, 100, 50, 250]
        }

        let orderListProps = {
            orders: [
                {
                    orderId: 1,
                    status: 'Pending',
                    expectedDate: '7/6/19'
                },
                {
                    orderId: 2,
                    status: 'Processing',
                    expectedDate: '10/6/19'
                },
                {
                    orderId: 3,
                    status: 'Checking',
                    expectedDate: '8/6/19'
                },
                {
                    orderId: 4,
                    status: 'Dispatched',
                    expectedDate: '7/6/19'
                },
                {
                    orderId: 5,
                    status: 'Delivered',
                    expectedDate: '5/6/19'
                },
                {
                    orderId: 1,
                    status: 'Pending',
                    expectedDate: '7/6/19'
                },
                {
                    orderId: 1,
                    status: 'Pending',
                    expectedDate: '7/6/19'
                },
                {
                    orderId: 1,
                    status: 'Pending',
                    expectedDate: '7/6/19'
                },
                {
                    orderId: 1,
                    status: 'Pending',
                    expectedDate: '7/6/19'
                }
            ]
        }

        return (
            <div className='col-md-12'>
                <div className='row'>
                    <div className='col-md-3 order-list-main'>
                        <OrderList {...orderListProps} />
                    </div>
                    <div className='col-md-9' id='order-page-frame'>
                        <BrowserRouter>
                            <Route exact path='/myOrders' render={(props) => <OrderPage {...props} {...orderPageProps} />} />
                            <Route path='/myOrders/:orderId' render={(props) => <OrderPage {...props} {...orderPageProps} />} />
                        </BrowserRouter>
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderCombinedView;