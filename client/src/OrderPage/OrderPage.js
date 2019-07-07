import React, { Component } from 'react';
import './OrderPage.css';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

// let props = {
//     orderNumber: '2341231',
//     orderedOnDate: '12/3/2019',
//     expectedByDate: '20/3/2019',
//     statusOfOrder: 'Payment Pending',
//     productId: ['12321421', '12332145', '16453', '2356', '2543'],
//     productName: ['Product1', 'Product2', 'Product3', 'Product4', 'Product5'],
//     rate: [10, 20, 30, 35, 5],
//     quantity: [150, 200, 100, 50, 250]
//   }

var user_id = "";
class OrderPage extends Component {

    orderNumber = 0;
    productOrders = [];

    constructor(props) {
        super(props);
        this.state = {
            order: {}
        }
    }

    componentWillMount() {
        var patharray = window.location.pathname.split('/');
        if (patharray[2] === "") {
            axios.get('/api/getuser')
                .then(res => {
                    user_id = res.data.id;
                    console.log("ID Received");
                })
                .then(res => {
                    axios.get('/api/orders/' + user_id)
                        .then(res => {
                            this.orderNumber = res.data.rows[0].orderNumber;
                            console.log("Order Number Received");
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
        }
        axios.get('/api/orders/' + this.orderNumber)
            .then(res => {
                this.setState((state, props) => ({
                    order: res.data
                }));
                console.log("Data Received");
            })
            .then(res => {
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
            })
            .catch(err => {
                console.log(err);
            })
    }

    // componentWillMount() {
    //     for (var i = 0; i < this.props.productName.length; i++) {
    //         this.productOrders.push({
    //             srNo: i + 1,
    //             productId: this.props.productId[i],
    //             productName: this.props.productName[i],
    //             rate: this.props.rate[i],
    //             quantity: this.props.quantity[i],
    //             amount: this.props.quantity[i] * this.props.rate[i]
    //         });
    //     }
    // }

    // componentDidMount() {
    //     //eslint-disable-next-line
    //     this.productOrders.map((product) => {
    //         this.setState((state, props) => ({
    //             grandTotal: state.grandTotal + product.amount
    //         }))
    //     });
    // }

    render() {
        return (
            <div>
                <div className='row orderPageTopBar'>
                    <div className='col-md-3 m-2 orderNumberDiv'>
                        <span className='OPorderNumber'>
                            {'#' + this.state.order.orderNumber}
                        </span>
                    </div>
                    <div className='col-md-3 m-2 text text-muted deliveryDates'>
                        <div className='row'>
                            Ordered On : {this.state.order.orderedOn}
                        </div>
                        <div className='row'>
                            Expected By : {this.state.order.expectedBy}
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
                                    <td className='table-active'>&#8377; {this.state.order.totalAmount}</td>
                                </tr>
                            </tbody>
                        </table>
                    </Paper>
                </div>
                <div class='bottom-bar mt-4'>
                    {(() => {
                        switch (this.props.statusOfOrder) {
                            case 'Payment Pending': return <Button variant='contained' color='primary'>MAKE PAYMENT</Button>;
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