import React, { Component } from 'react';
import './CartList.css';
import CardListCard from '../CartListCard/CartListCard'
import axios from 'axios';
class CartList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            grandTotal: 0
        }
    }

    handleProceedToCheckout = () => {
        var params = {
            "status": "Pending",
            "totalAmount": this.state.grandTotal
        }
        console.log("Request Sent");
        axios.post("/api/orders",params);
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
            <div className='col-md-12'>
                <div className='row top-bar'>
                    <div className='col-md-9'>
                        <span className='amountPayable mt-2'>Amount Payable:</span>&nbsp;&nbsp;<span className='totalAmount ml-3'>&#8377;{this.state.grandTotal}</span>
                    </div>
                    <div className='col-md-1'></div>
                    <div className='col-md-2'>
                        <button type='button' className='checkoutButton btn btn-dark mt-3' onClick={() => this.handleProceedToCheckout()}>PROCEED TO CHECKOUT</button>
                    </div>
                </div>
                <div className='row m-3'>
                    {this.cartListItems}
                </div>
            </div>
        )
    }
}

export default CartList;