import React, { Component } from "react";
import "./ProductPage.css";
import NumericInput from 'react-numeric-input';
import axios from 'axios';

var user_id="";

class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalAmt: 0,
            quantity: 0,
            product: {},
            image: ''
        }
    }

    componentDidMount() {
        var patharray = window.location.pathname.split("/");
        // console.log(patharray[2]);
        var id = patharray[2];
        axios.get("/api/products/" + id)
            .then(res => {
                var data = res.data;
                // console.log({ data });
                this.setState((state, props) => ({
                    product: data
                }));
            })
            .then(res => {
                this.updatePage();
            })
            .catch(err => {
                console.log(err);
            });
        // console.log(this.state.product);
    }

    updatePage = () => {
        // console.log(this.state.product);
        let images = require.context('../assets/images/');
        this.setState((state, props) => ({
            totalAmt: state.product.step * state.product.rate,
            quantity: state.product.step,
            image: images('./' + state.product.image)
        }))
    }

    calculateTotal = () => {
        this.setState((state, props) => ({
            quantity: document.getElementById('quantity').value
        }));
        this.updateTotal();
    }

    updateTotal = () => {
        this.setState((state, props) => ({
            totalAmt: state.quantity * state.product.rate
        }));
    }

    addToCartProdPage = () => {
        axios.get('/api/getuser')
        .then(res => {
            user_id = res.data.id;
            // console.log("ID Received");
        })
        .then(res => {
            var params = {
                "user_id": user_id,
                "rate": this.state.product.rate,
                "step": this.state.product.step,
                "image": this.state.product.image,
                "name": this.state.product.name,
                "quantity": this.state.quantity,
                "id": this.state.product.id
            }
            axios.post('/api/cart',params)
            .then(res => {
                console.log("Added to Cart");
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    addToFavProdPage = () => {
        //code for adding to favourites
        axios.get("/api/getuser")
        .then(res => {
            user_id = res.data.id;
            console.log(user_id);
        })
        .then(res => {
            axios.post("/api/favs",{
                "user_id": user_id,
                "product_id": this.state.product.id
            })
        })
        .catch(err=>{
            console.log(err);
        })
    }

    render() {
        return (
            <div className="col-md-12 background">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className='row'>
                                <img src={this.state.image} alt={this.state.product.name} height="400px" width="350px" className="productImage" />
                            </div>
                            <br />
                            <div className='row'>
                                <div className='col-md-5'>
                                    <button className="btn btn-dark addToCart" onClick={() => this.addToCartProdPage()}><i className='material-icons'>add_shopping_cart</i>ADD TO CART</button>
                                </div>
                                <div className='col-md-7'>
                                    <button className="btn btn-dark addToFav" onClick={() => this.addToFavProdPage()} ><i className='material-icons'>favorite</i>ADD TO FAVOURITES</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 offset-md-1">
                            <div className="row">
                                <div className="ml-5">
                                    <h1>{this.state.product.name}</h1>
                                </div>
                            </div>
                            <hr />
                            <div className="row ml-5">
                                <div className="form-group">
                                    <span className='product-page-label'>Product Code :</span> {this.state.product.id}
                                </div>
                            </div>
                            <hr />
                            <div className="ml-5">
                                <form>
                                    <div className="form-group">
                                        <p className="totalRate">&#8377; {this.state.totalAmt} </p>
                                    </div>
                                    <div className="form-group">
                                        <span className='product-page-label'>Quantity:</span>
                                        <NumericInput className="form-control" step={this.state.product.step} value={this.state.quantity} min={0} id="quantity" onChange={() => this.calculateTotal()} />
                                        <small className='text text-muted'>Sold in quantities of {this.state.product.step}</small>
                                    </div>
                                </form>
                            </div>
                            {/*<div className="ml-5 form-group">
                                <label className='product-page-label'>Filters:</label>
                                <p>Add Filters over here.</p>
                            </div>*/}
                            <hr />
                            <div className="row ml-5">
                                <label className='product-page-label'>Description:</label>
                                <p className='product-description'>
                                    {this.state.product.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductPage;