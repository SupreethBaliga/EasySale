import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import './OrderListItem.css';

// let props = {
//     orders: [
//       {
//         orderNumber: 1,
//         status: 'Pending',
//         expectedDate: '12/6/19'
//       },
//       {
//         orderNumber: 2,
//         status: 'Processed',
//         expectedDate: '10/6/19'
//       },
//       {
//         orderNumber: 3,
//         status: 'Checking',
//         expectedDate: '8/6/19'
//       },
//       {
//         orderNumber: 4,
//         status: 'Dispatched',
//         expectedDate: '7/6/19'
//       },
//       {
//         orderNumber: 5,
//         status: 'Delivered',
//         expectedDate: '5/6/19'
//       }
//     ]
//   }

class OrderListItem extends Component {
    render() {
        return (
            <a className='list-item' href={"/myOrders/" + this.props.orderId}>
                <ListItem alignItems='flex-start'>
                    <ListItemAvatar>
                        <span className="orderNumber">&#35;{this.props.orderId}</span>
                    </ListItemAvatar>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <ListItemText primary={this.props.status} secondary={'Expected By: ' + this.props.expectedDate} className='order-info' />
                    <ListItemAvatar>
                        <i className='material-icons arrow'>arrow_forward_ios</i>
                    </ListItemAvatar>
                </ListItem>
            </a>
        );
    }
}

export default OrderListItem;