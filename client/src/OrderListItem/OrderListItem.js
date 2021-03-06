import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import './OrderListItem.css';

class OrderListItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            expectedBy : this.props.expectedby
        }
    }

    render() {
        return (
            <a className='order-list-cli-list-item btn' href={"/myOrders/" + this.props.ordernumber}>
                <ListItem alignItems='flex-start'>
                    <ListItemAvatar>
                        <span className="orderNumber">&#35;{this.props.ordernumber}</span>
                    </ListItemAvatar>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <ListItemText primary={this.props.status} secondary={'Expected By: ' + this.state.expectedBy} className='order-info' />
                    <ListItemAvatar>
                        <i className='material-icons arrow'>arrow_forward_ios</i>
                    </ListItemAvatar>
                </ListItem>
            </a>
        );
    }
}

export default OrderListItem;
