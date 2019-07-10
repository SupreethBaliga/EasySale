import React, { Component } from 'react';
import './OrderPage.css';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

class OrderPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            order: {},
            user: {},
            status: ""
        }
    }

    componentDidMount() {

        var patharray = window.location.pathname.split('/');
        var orderNumber;
        if (patharray[3] == null) {
            axios.get('/api/orders/')
                .then(res => {
                    orderNumber = res.data.rows[0].ordernumber;
                })
                .then(res => {
                    axios.get('/api/orders/by/' + orderNumber)
                        .then(res => {
                            this.setState((state, props) => ({
                                order: res.data,
                                status: res.data.status
                            }));
                        })
                        .then(res => {
                            axios.get('/api/users/' + this.state.order.user_id)
                                .then(res => {
                                    this.setState((state, props) => ({
                                        user: res.data
                                    }));
                                })
                                .then(res => {
                                    this.populateOrderTable();
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(err => {
                    console.log(err);
                });
        }
        else {
            orderNumber = parseInt(patharray[3], 10);
            axios.get('/api/orders/by/' + orderNumber)
                        .then(res => {
                            this.setState((state, props) => ({
                                order: res.data,
                                status: res.data.status
                            }));
                        })
                        .then(res => {
                            axios.get('/api/users/' + this.state.order.user_id)
                                .then(res => {
                                    this.setState((state, props) => ({
                                        user: res.data
                                    }));
                                })
                                .then(res => {
                                    this.populateOrderTable();
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                        })
                        .catch(err => {
                            console.log(err);
                        });
        }        
    }

    productOrders = [];

    populateOrderTable = () => {
        for (var i = 0; i < this.state.order.name.length; i++) {
            this.productOrders.push({
                srNo: i + 1,
                id: this.state.order.id[i],
                name: this.state.order.name[i],
                rate: this.state.order.rate[i],
                quantity: this.state.order.quantity[i],
                amount: this.state.order.rate[i] * this.state.order.quantity[i]
            });
        }
        this.setState((state,props)=> ({
            order: state.order
        }));
    }

    setStatusOfOrder = () => {
        var orderStatus = document.getElementById('select-status-of-order').value;
        var params = {
            "status": orderStatus
        }
        axios.put('/api/orders/' + this.state.order.ordernumber, params)
            .then(res => {
                this.setState((state, props) => ({
                    status: orderStatus
                }));
                window.location.href='/seller/orders';
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <div className='col-md-12 order-page-scroll-mech'>
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
                        <span className='order-status'>Order Status : {this.state.status}</span>
                    </div>
                </div>
                <div className='col-md-10 offset-md-1'>
                    <div className='row mt-3'>
                        <div className='col-md-8'>
                            <div className='col-md-4 order-page-client-detail-label'>
                                Organisation:
                            </div>
                            <div className='col-md-8 order-page-client-detail-value'>
                                {this.state.user.organisationname}
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='col-md-4 order-page-client-detail-label'>
                                Contact:
                        </div>
                            <div className='col-md-8 order-page-client-detail-value'>
                                {this.state.user.contactnumber}
                            </div>
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <div className='col-md-8'>
                            <div className='col-md-4 order-page-client-detail-label'>
                                Delivery Address:
                            </div>
                            <div className='col-md-8 order-page-client-detail-value'>
                                {this.state.user.deliveryaddress}
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='col-md-4 order-page-client-detail-label'>
                                Email:
                        </div>
                            <div className='col-md-8 order-page-client-detail-value'>
                                {this.state.user.email}
                            </div>
                        </div>
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
                <br />
                <form className='col-md-12'>

                    <div className='row add-padding'>
                        <div className='col-md-2'></div>
                        <div className='col-md-2'>
                            <label className='label-text'>Order Status:</label>
                        </div>
                        <div className='col-md-4'>
                            <select className='select' id='select-status-of-order'>
                                <option>Payment</option>
                                <option>Dispatched</option>
                                <option>Delivered</option>
                                <option>Pending</option>
                            </select>
                        </div>
                        <div className='col-md-2'>
                            <button className='btn btn-dark form-control set-status-btn' onClick={() => this.setStatusOfOrder()}>SET STATUS</button>
                        </div>
                        <div className='col-md-2'></div>
                    </div>
                </form>
                <br />
                <br />
            </div>
        )
    }
}

export default OrderPage;
