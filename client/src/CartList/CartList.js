import React, { Component } from 'react';
import './CartList.css';
import CardListCard from '../CartListCard/CartListCard'
// import Button from '@material-ui/core/Button'
class CartList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            grandTotal: 0
        }
    }

    updateGrandTotal = (cost) => {
        this.setState((state, props) => ({
            grandTotal: state.grandTotal + cost
        }));
    }

    cartListItems = this.props.cartListItems.map((cartItem) => {
        return (
            <CardListCard key={cartItem.productId} {...cartItem} updateGrandTotal={this.updateGrandTotal} />
        )
    });
    render() {
        return (
            <div>
                <div className='row top-bar'>
                    <span className='amountPayable ml-5 mt-2'>Amount Payable:</span>&nbsp;&nbsp;<span className='totalAmount ml-3'>&#8377;{this.state.grandTotal}</span>
                    <button className='checkoutButton btn btn-dark m-3 ml-5'>PROCEED TO CHECKOUT</button>
                </div>
                <div className='row m-3'>
                    {this.cartListItems}
                </div>
            </div>
        )
    }
}

export default CartList;