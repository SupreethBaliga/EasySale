import React, { Component } from 'react';
import './OrderList.css';
import List from '@material-ui/core/List';
import OrderListItem from '../OrderListItem/OrderListItem';
import axios from 'axios';

class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
    }

    componentDidMount() {
        axios.get('/api/orders/')
            .then(res => {
                var dborders = res.data;
                this.setState((state, props) => ({
                    orders: dborders.rows
                }));
            })
            .then(res => {
                this.populateOrders();
            })
            .catch(err => {
                console.log(err);
            })
    }

    orderListItems = [];

    populateOrders = () => {
        this.orderListItems = this.state.orders.map((order) => {
            return (
                <OrderListItem key={order.ordernumber} {...order} />
            );
        })
        this.setState((state,props) => ({
            orders: state.orders
        }));
    }

    render() {
        return (
            <div className="col-md-12 order-list">
                <List>
                    {this.orderListItems}
                </List>
            </div>
        )
    }
}

export default OrderList;
