import React, { Component } from 'react';
import './OrderList.css';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import OrderListItem from '../OrderListItem/OrderListItem';
import axios from 'axios';

var user_id = "";
class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
    }

    componentDidMount() {
        axios.get('/api/getuser/')
            .then(res => {
                user_id = res.data.id;
                // console.log('ID Received');
            })
            .then(res => {
                axios.get('/api/orders/' + user_id)
                    .then(res => {
                        var orders = res.data;
                        this.setState((state, props) => ({
                            orders: orders.rows
                        }));
                    })
                    .then(res => {
                        this.populateOrders();
                    })
                    .then(res => {
                        this.setState((state, props) => ({
                            orders: state.orders
                        }))
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err);
            });
    }

    orderListItems = [];

    populateOrders = () => {
        this.orderListItems = this.state.orders.map((order) => {
            return (
                <OrderListItem key={order.ordernumber} {...order} />
            )
        });
        this.setState((state,props) => ({
            orders: state.orders
        }))
    }


    // orderListItems = this.props.orders.map((order) => {
    //     return (
    //         <OrderListItem key={toString(order.orderNumber)} {...order} />
    //     )
    // });

    render() {
        return (
            <div className="col-md-12 order-list">
                <List subheader={
                    <ListSubheader>
                        Your Orders
                </ListSubheader>
                }>
                    {this.orderListItems}
                </List>
            </div>
        )
    }
}

export default OrderList;