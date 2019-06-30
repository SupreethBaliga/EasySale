import React, { Component } from 'react';
import './RequestedOrderPage.css';
import Paper from '@material-ui/core/Paper';


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

    productOrders = [];

    componentWillMount() {
        for (var i = 0; i < this.props.orderDetails.productName.length; i++) {
            this.productOrders.push({
                srNo: i + 1,
                productId: this.props.orderDetails.productId[i],
                productName: this.props.orderDetails.productName[i],
                rate: this.props.orderDetails.rate[i],
                quantity: this.props.orderDetails.quantity[i],
                amount: this.props.orderDetails.quantity[i] * this.props.orderDetails.rate[i]
            });
        }
    }

    render() {
        return (
            <div className='col-md-12'>
                <div className='row orderPageTopBar'>
                    <div className='col-md-4 m-3 orgName-div'>
                        <span className='orgName-border'>
                            {this.props.orgName}
                        </span>
                    </div>
                    <div className='col-md-4 mt-3 text text-muted deliveryDates'>
                        <div className='row'>
                            <span className='top-bar-labels'>Ordered On :&nbsp;</span>{this.props.orderedOn}
                        </div>
                        <div className='row'>
                            <span className='top-bar-labels'>Contact :&nbsp;</span>{this.props.contactNo}
                        </div>
                        <div className='row'>
                            <span className='top-bar-labels'>Email :&nbsp;</span>{this.props.orgEmail}
                        </div>
                    </div>
                    <div className='col-md-3 mt-3 text text-muted'>
                        <label className='top-bar-labels'>Delivery Address:</label>
                        <p className=''>
                            {this.props.deliveryAddress}
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
                                        <td>{product.productId}</td>
                                        <td>{product.productName}</td>
                                        <td>&#8377; {product.rate}</td>
                                        <td>{product.quantity}</td>
                                        <td>&#8377; {product.amount}</td>
                                    </tr>
                                ))}
                                <tr className='total-row'>
                                    <td className='table-active' colSpan='4' />
                                    <td className='table-active'>Grand Total : </td>
                                    <td className='table-active'>&#8377; {this.props.total}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Paper>
                </div>
                <br />
                <div className='col-md-8 offset-md-2'>
                    <div className='row'>
                        <div className='col-md-6 mb-4 accept-reject-border-div'>
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
                                <button className='btn btn-dark form-control accept-order-btn'>ACCEPT</button>
                            </div>
                        </div>
                        <div className='col-md-6 mb-4 accept-reject-border-div'>
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
                                <button className='btn btn-dark form-control reject-order-btn'>REJECT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RequestedOrderPage;