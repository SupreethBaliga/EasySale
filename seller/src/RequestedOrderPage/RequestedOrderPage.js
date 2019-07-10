import React, { Component } from 'react';
import './RequestedOrderPage.css';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

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

        axios.get('/api/orders/by/' + orderNumber)
            .then(res => {
                this.setState((state, props) => ({
                    order: res.data
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
        this.setState((state,props) => ({
            order: state.order,
            user: state.user
        }))
    }

    acceptReqOrder = () => {
        var expectedDate = document.getElementById("expected-by-date-input").value;
        var datearr = expectedDate.split('-');
        var params = {
            status: "Payment Pending",
            expectedBy : datearr[2]+'-'+datearr[1]+'-'+datearr[0]
        }
        axios.put('/api/orders/expdate/' + this.state.order.ordernumber, params)
            .then(res => {
                window.location.pathname='/seller/orders';
            })
            .catch(err => {
                console.log(err);
            }) 
    }

    rejectReqOrder = () => {
        var params = {
            status: "Rejected"
        }
        axios.put('/api/orders/' + this.state.order.ordernumber, params)
            .then(res => {
                window.location.pathname='/seller/orders';
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
                            {this.state.user.organisationname}
                        </span>
                    </div>
                    <div className='col-md-4 mt-3 text text-muted deliveryDates'>
                        <div className='row'>
                            <span className='top-bar-labels'>Ordered On :&nbsp;</span>{this.state.order.orderedon}
                        </div>
                        <div className='row'>
                            <span className='top-bar-labels'>Contact :&nbsp;</span>{this.state.user.contactnumber}
                        </div>
                        <div className='row'>
                            <span className='top-bar-labels'>Email :&nbsp;</span>{this.state.user.email}
                        </div>
                    </div>
                    <div className='col-md-3 mt-3 text text-muted'>
                        <label className='top-bar-labels'>Delivery Address:</label>
                        <p className=''>
                            {this.state.user.deliveryaddress}
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
                                    <td className='table-active'>&#8377; {this.state.order.totalamount}</td>
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
                                <input type='date' className='form-control' id='expected-by-date-input'/>
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
                            <br /><br /><br/>
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
