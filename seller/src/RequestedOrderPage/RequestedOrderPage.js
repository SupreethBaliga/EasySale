import React, { Component } from 'react';
import './RequestedOrderPage.css';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

// let props = {
//     orgName: 'Supreeth Baliga Paper Products And Materials',
//     orderedOn: '12/4/12',
//     contactNo: '9879765123',
//     orgEmail: 'supreethbaliga@gmail.com',
//     deliveryAddress: 'C204, Manavsthal Heights, Off Military Road, Andheri',
//     orderDetails: {
//       productId: ['12321421', '12332145', '16453', '2356', '2543'],
//       productName: ['Product1', 'Product2', 'Product3', 'Product4', 'Product5'],
//       rate: [10, 20, 30, 35, 5],
//       quantity: [150, 200, 100, 50, 250]
//     },
//     total: 12323
//   }

class RequestedOrderPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            order: {},
            user: {}
        }
    }

    componentDidMount() {

        var patharray = window.location.pathname.split('/');
        var orderNumber = parseInt(patharray[2], 10);
        axios.get('/api/orders/' + orderNumber)
            .then(res => {
                this.setState((state, props) => ({
                    order: res.data,
                }));
                console.log("Order Data Received");
            })
            .then(res => {
                axios.get('/api/users/' + this.state.order.user_id)
                    .then(res => {
                        this.setState((state, props) => ({
                            user: res.data
                        }));
                        console.log("User Data Received");
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
    }

    acceptReqOrder = () => {
        // console.log("Put in for accept");
        var params = {
            status: "Payment Pending"
        }
        axios.put('/api/orders/' + this.state.order.orderNumber, params)
            .then(res => {
                console.log("Order Accepted");
            })
            .catch(err => {
                console.log(err);
            })
    }

    rejectReqOrder = () => {
        var params = {
            status: "Rejected"
        }
        axios.put('/api/orders/' + this.state.order.orderNumber, params)
            .then(res => {
                console.log("Order Rejected");
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div className='col-md-12'>
                <div className='row orderPageTopBar'>
                    <div className='col-md-4 m-3 orgName-div'>
                        <span className='orgName-border'>
                            {this.state.user.organisationName}
                        </span>
                    </div>
                    <div className='col-md-4 mt-3 text text-muted deliveryDates'>
                        <div className='row'>
                            <span className='top-bar-labels'>Ordered On :&nbsp;</span>{this.state.order.orderedOn}
                        </div>
                        <div className='row'>
                            <span className='top-bar-labels'>Contact :&nbsp;</span>{this.state.user.contactNumber}
                        </div>
                        <div className='row'>
                            <span className='top-bar-labels'>Email :&nbsp;</span>{this.state.user.email}
                        </div>
                    </div>
                    <div className='col-md-3 mt-3 text text-muted'>
                        <label className='top-bar-labels'>Delivery Address:</label>
                        <p className=''>
                            {this.state.user.deliveryAddress}
                        </p>
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
                                    <td className='table-active'>&#8377; {this.state.order.totalAmount}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Paper>
                </div>
                <br />
                <div className='col-md-10 offset-md-1'>
                    <div className='row'>
                        <div className='col-md-5 mb-4 accept-reject-border-div'>
                            <div className='accept-reject-label'>
                                <label>Accept Order</label>
                            </div>
                            <hr />
                            <div className='form-group'>
                                <label className='accept-reject-field-label'>To Be Delivered By:</label>
                                <input type='date' className='form-control' />
                            </div>
                            <div className='form-group'>
                                <label className='accept-reject-field-label'>Remarks:</label>
                                <textarea className='form-control' rows='3' />
                            </div>
                            <div className='form-group'>
                                <button className='btn btn-dark form-control accept-order-btn' onClick={() => this.acceptReqOrder()}>ACCEPT</button>
                            </div>
                        </div>
                        <div className='col-md-2'></div>
                        <div className='col-md-5 mb-4 accept-reject-border-div'>
                            <div className='accept-reject-label'>
                                <label>Reject Order</label>
                            </div>
                            <hr />
                            <div className='form-group'>
                                <label className='accept-reject-field-label'>Reason For Rejection:</label>
                                <textarea className='form-control' rows='5' />
                            </div>
                            <br /><br />
                            <div className='form-group'>
                                <button className='btn btn-dark form-control reject-order-btn' onClick={() => this.rejectReqOrder()}>REJECT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RequestedOrderPage;