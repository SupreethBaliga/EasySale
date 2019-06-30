import React, { Component } from 'react';
import './RequestedOrdersList.css';

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

class RequestedOrdersList extends Component {

    orderList = this.props.orders.map((order) => {
        return (
            <div className='col-md-6 offset-md-3 mt-3 order-list-item-full'>
                <div className='row'>
                    <div className='col-md-5'>
                        <div className='orgName-div'>
                            {order.orgName}
                        </div>
                        <small className='text text-muted ordered-on-text'>Ordered On : {order.orderedOn}</small>
                    </div>
                    <div className='col-md-5 order-total'>
                        &#8377; {order.total}
                    </div>
                    <div className='col-md-2 arrow-div'>
                        <a href={'/reqorders/' + order.uniqueId}>
                            <i className='material-icons arrow' style={{ color: '#bfbfbf' }}>arrow_forward_ios</i>
                        </a>
                    </div>
                </div>
            </div >
        )
    })

    render() {
        return (
            <div className='orders-list-full-page'>
                {this.orderList}
            </div>
        )
    }

}

export default RequestedOrdersList;