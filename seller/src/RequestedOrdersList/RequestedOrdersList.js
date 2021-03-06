import React, { Component } from 'react';
import './RequestedOrdersList.css';
import axios from 'axios';

class RequestedOrdersList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reqorders: []
        }
    }

    componentDidMount() {

        axios.get('/api/getuser')
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })

        axios.get('/api/orders/pending/')
            .then(res => {
                this.setState((state, props) => ({
                    reqorders: res.data.rows
                }))
            })
            .then(res => {
                this.populateReqOrders()
            })
            .catch(err => {
                console.log(err);
            })
    }

    orderList = [];

    populateReqOrders = () => {
        this.orderList = this.state.reqorders.map((order) => {
            return (
                <a href={'/reqorders/' + order.ordernumber} className='req-order-list-item'>
                    <div key={order.ordernumber} className='col-md-6 offset-md-3 mt-3 order-list-item-full'>
                        <div className='row'>
                            <div className='col-md-5'>
                                <div className='orgName-div-req'>
                                    {order.user_name}
                                </div>
                                <small className='text text-muted ordered-on-text'>Ordered On : {order.orderedon}</small>
                            </div>
                            <div className='col-md-5 order-total'>
                                &#8377; {order.totalamount}
                            </div>
                            <div className='col-md-2 arrow-div'>
                                    <i className='material-icons arrow-req' style={{ color: '#000000' }}>arrow_forward_ios</i>
                            </div>
                        </div>
                    </div>
                </a>
            )
        })
        this.setState((state,props) => ({
            reqorders: state.reqorders
        }))
    }

    render() {
        return (
            <div className='orders-list-full-page'>
                {this.orderList}
            </div>
        )
    }
}

export default RequestedOrdersList;
