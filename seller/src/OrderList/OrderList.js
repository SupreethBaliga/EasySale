import React, { Component } from 'react';
import './OrderList.css';
import List from '@material-ui/core/List';
// import ListSubheader from '@material-ui/core/ListSubheader';
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
                console.log(res.data);
                var dborders = res.data;
                this.setState((state, props) => ({
                    orders: dborders.rows
                }));
                console.log("Order Received");
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

    // orderListItems = this.props.orders.map((order) => {
    //     return (
    //         <OrderListItem key={toString(order.orderNumber)} {...order} />
    //     )
    // });

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