import React, { Component } from 'react';
import './RequestedOrdersList.css';
import axios from 'axios';

// let reqProps = {
//     orders: [
//       {
//         uniqueId: '12340901',
//         orgName: 'Supreeth Baliga',
//         orderedOn: '12/4/12',
//         deliveryAddress: 'C204, Manavsthal Heights, Off Military Road, Andheri',
//         orderDetails: {
//           productId: ['12321421', '12332145', '16453', '2356', '2543'],
//           productName: ['Product1', 'Product2', 'Product3', 'Product4', 'Product5'],
//           rate: [10, 20, 30, 35, 5],
//           quantity: [150, 200, 100, 50, 250]
//         },
//         total: 12323
//       },
//       {
//         uniqueId: '12340901',
//         orgName: 'Supreeth Baliga',
//         orderedOn: '12/4/12',
//         deliveryAddress: 'C204, Manavsthal Heights, Off Military Road, Andheri',
//         orderDetails: {
//           productId: ['12321421', '12332145', '16453', '2356', '2543'],
//           productName: ['Product1', 'Product2', 'Product3', 'Product4', 'Product5'],
//           rate: [10, 20, 30, 35, 5],
//           quantity: [150, 200, 100, 50, 250]
//         },
//         total: 12323
//       },
//       {
//         uniqueId: '12340901',
//         orgName: 'Supreeth Baliga',
//         orderedOn: '12/4/12',
//         deliveryAddress: 'C204, Manavsthal Heights, Off Military Road, Andheri',
//         orderDetails: {
//           productId: ['12321421', '12332145', '16453', '2356', '2543'],
//           productName: ['Product1', 'Product2', 'Product3', 'Product4', 'Product5'],
//           rate: [10, 20, 30, 35, 5],
//           quantity: [150, 200, 100, 50, 250]
//         },
//         total: 12323
//       },
//       {
//         uniqueId: '12340901',
//         orgName: 'Supreeth Baliga',
//         orderedOn: '12/4/12',
//         deliveryAddress: 'C204, Manavsthal Heights, Off Military Road, Andheri',
//         orderDetails: {
//           productId: ['12321421', '12332145', '16453', '2356', '2543'],
//           productName: ['Product1', 'Product2', 'Product3', 'Product4', 'Product5'],
//           rate: [10, 20, 30, 35, 5],
//           quantity: [150, 200, 100, 50, 250]
//         },
//         total: 12323
//       }
//     ]
//   }
// var user;

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
                // console.log(this.state.reqorders);
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
            console.log(order);
            return (
                <div key={order.ordernumber} className='col-md-6 offset-md-3 mt-3 order-list-item-full'>
                    <div className='row'>
                        <div className='col-md-5'>
                            <div className='orgName-div'>
                                {order.user_name}
                            </div>
                            <small className='text text-muted ordered-on-text'>Ordered On : {order.orderedon}</small>
                        </div>
                        <div className='col-md-5 order-total'>
                            &#8377; {order.totalamount}
                        </div>
                        <div className='col-md-2 arrow-div'>
                            <a href={'/reqorders/' + order.ordernumber}>
                                <i className='material-icons arrow' style={{ color: '#bfbfbf' }}>arrow_forward_ios</i>
                            </a>
                        </div>
                    </div>
                </div>
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