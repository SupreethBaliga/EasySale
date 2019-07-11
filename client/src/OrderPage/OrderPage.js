import React, { Component } from 'react';
import './OrderPage.css';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

var user_id = "";
class OrderPage extends Component {

    orderNumber = 0;
    productOrders = [];

    constructor(props) {
        super(props);
        this.state = {
            order: {},
            expectedBy : ""
        }
    }

    componentWillMount() {
        var patharray = window.location.pathname.split('/');
        
        if (patharray[2] == null) {
            axios.get('/api/getuser')
                .then(res => {
                    if(res.data == null) window.location.href = '/';
                    else user_id = res.data.id;
                })
                .then(res => {
                    axios.get('/api/orders/' + user_id)
                        .then(res => {
                            this.orderNumber = res.data.rows[0].ordernumber;
                        })
                        .then(res => {
                            axios.get('/api/orders/by/' + this.orderNumber)
                                .then(res => {
                                    this.setState((state, props) => ({
                                        order: res.data
                                    }));
                                })
                                .then(res => {
                                    this.populateTable();
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })
                .catch(err => {
                    console.log(err);
                })
        }
        else {
            this.orderNumber = parseInt(patharray[2], 10);
            axios.get('/api/orders/by/' + this.orderNumber)
                .then(res => {
                    this.setState((state, props) => ({
                        order: res.data
                    }));
                })
                .then(res => {
                    this.populateTable();
                })
                .catch(err => {
                    console.log(err);
                })
        }
        this.setState({
            expectedBy : this.state.order.orderedon
        })
    }

    populateTable = () => {
        for (var i = 0; i < this.state.order.name.length; i++) {
            this.productOrders.push({
                srNo: i + 1,
                id: this.state.order.id[i],
                name: this.state.order.name[i],
                rate: this.state.order.rate[i],
                quantity: this.state.order.quantity[i],
                amount: this.state.order.quantity[i] * this.state.order.rate[i]
            });
        }
        this.setState((state,props) => ({
            order: state.order
        }));
    }

    render() {
        return (
            <div>
                <div className='row orderPageTopBar'>
                    <div className='col-md-3 m-2 orderNumberDiv'>
                        <span className='OPorderNumber'>
                            {'#' + this.state.order.ordernumber}
                        </span>
                    </div>
                    <div className='col-md-3 m-2 text text-muted deliveryDates'>
                        <div className='row'>
                            Ordered On : {this.state.order.orderedon}
                        </div>
                        <div className='row'>
                            Expected By : {this.state.order.expectedby}
                        </div>
                    </div>
                    <div className='col-md-5 m-2'>
                        <span className='order-status'>Order Status : {this.state.order.status}</span>
                    </div>
                </div>
                <div className='orderSummary'>
                    Order Summary:
                </div>
                <div>
                    <Paper className='table-style'>
                        <table className='table'>
                            <thead class='thead-dark'>
                                <tr>
                                    <th scope='col'>#</th>
                                    <th scope='col'>PRODUCT ID</th>
                                    <th scope='col'>PRODUCT NAME</th>
                                    <th scope='col'>RATE</th>
                                    <th scope='col'>QUANTITY</th>
                                    <th scope='col'>AMOUNT</th>
                                </tr>
                            </thead>
                            <tbody className='table-body'>
                                {this.productOrders.map((product) => (
                                    <tr>
                                        <th scope='row'>{product.srNo}</th>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>&#8377; {product.rate}</td>
                                        <td>{product.quantity}</td>
                                        <td>&#8377; {product.amount}</td>
                                    </tr>
                                ))}
                                <tr className='total-row'>
                                    <td className='table-active' colSpan='4' />
                                    <td className='table-active'>Grand Total : </td>
                                    <td className='table-active'>&#8377; {this.state.order.totalamount}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Paper>
                </div>
                <div class='bottom-bar mt-4'>
                    {(() => {
                        var payment = 0.3*this.state.order.totalamount;
                        switch (this.state.order.status) {
                            case 'Payment Pending': return <a href = {"/api/paywithpaytm?amount=" + payment}><Button variant='contained' color='primary'>MAKE PAYMENT</Button></a>;
                            case 'Advance Payment Pending': return (<Button variant='contained' color='primary'>MAKE PAYMENT</Button>);
                            default: return null;
                        }
                    })()}
                </div>
            </div>
        )
    }
}

export default OrderPage;
