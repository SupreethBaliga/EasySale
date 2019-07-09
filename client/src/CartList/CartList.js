import React, { Component } from 'react';
import './CartList.css';
import CartListCard from '../CartListCard/CartListCard';
import axios from 'axios';

var user_id = "";

class CartList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            grandTotal: 0,
            products: []
        }
    }

    componentDidMount() {
        axios.get("/api/getuser")
            .then(res => {
                user_id = res.data.id;
                console.log(user_id);
            })
            .then(res => {
                axios.get("/api/cart/" + user_id)
                    .then(res => {
                        const dbproducts = res.data;
                        console.log(dbproducts);
                        this.setState((state, props) => ({
                            products: dbproducts.rows
                        }));
                    })
                    .then(res => {
                        this.populateCart();
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err);
            });
    }

    cartListItems = [];

    populateCart = () => {
        this.cartListItems = this.state.products.map((product) =>
            <CartListCard key={product.id} {...product} updateGrandTotal={this.updateGrandTotal} />
        );
        this.setState((state, products) => ({
            products: state.products
        }));
    }

    handleProceedToCheckout = () => {

        var params = {
            "status" : "Pending",
            "id": [],
            "name" : [],
            "rate": [],
            "quantity": [],
            "totalAmount": this.state.grandTotal,
            "user_id": user_id
        }

        this.state.products.map((product) => {
            params.id.push(product.id);
            params.name.push(product.name);
            params.rate.push(product.rate);
            params.quantity.push(document.getElementById('quantity'+product.id).value);
            return null;
        });

        axios.post("/api/orders",params)
        .then(res => {
            axios.delete("/api/cart/"+user_id)
            .then(res => {
                console.log("Cart Deleted");
                window.location.href='/myOrders';
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch(err => {
            console.log(err);
        });
    }

    updateGrandTotal = (cost) => {
        this.setState((state, props) => ({
            grandTotal: state.grandTotal + cost
        }));
    }

    // cartListItems = this.props.cartListItems.map((cartItem) => {
    //     return (
    //         <CardListCard key={cartItem.productId} {...cartItem} updateGrandTotal={this.updateGrandTotal} />
    //     )
    // });
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