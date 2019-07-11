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
                if(res.data==null) window.location.pathname = '/';
                else if(res.data.email==="admin@gmail.com") window.location.assign("//seller.easysale.live/");
                else user_id = res.data.id;
            })
            .then(res => {
                axios.get("/api/cart/" + user_id)
                    .then(res => {
                        const dbproducts = res.data;
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

        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var datestr = day + '-' + month + '-' + year;

        var params = {
            "orderedOn": datestr,
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

    render() {
        return (
            <div className='col-md-12 cart-list-page'>
                <div className='row cart-top-bar'>
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
