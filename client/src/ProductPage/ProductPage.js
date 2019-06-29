import React, { Component } from "react";
import "./ProductPage.css";
import NumericInput from 'react-numeric-input';
//import App from "../App";

//Props required for this page:
/*
props= [rate,productid,imageLink,content,filters[],productTitle,step]
*/


// let productPageProps = {
//     rate: 4,
//     productId: "oi2j812u082u4",
//     imageLink: require('./assets/images/prod5.jpeg'),
//     content: "woihjwiorhe1 uwhdouqh qiehqw oiqheioqhe qoiehiqowhe oqihweio iiqheioqhe qioeqiowje oqehqwioheioqh ohqroihwrhqiorh",
//     productTitle: "Prod5",
//     step: 100,
//     defaultValue: 100
//   }



class ProductPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalAmt: this.props.defaultValue * this.props.rate,
            quantity: this.props.defaultValue
        }
    }

    calculateTotal = () => {
        this.setState((state, props) => ({
            quantity: document.getElementById('quantity').value
        }));
        this.updateTotal();
    }

    updateTotal = () => {
        this.setState((state, props) => ({
            totalAmt: state.quantity * props.rate
        }));
    }


    render() {
        return (
            <div className="col-md-12 background">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className='row'>
                                <img src={this.props.imageLink} alt={this.props.productTitle} height="400px" width="350px" className="productImage" />
                            </div>
                            <br />
                            <div className='row'>
                                <div className='col-md-5'>
                                    <button className="btn btn-dark addToCart"><i className='material-icons'>add_shopping_cart</i>ADD TO CART</button>
                                </div>
                                <div className='col-md-7'>
                                    <button className="btn btn-dark addToFav"><i className='material-icons'>favorite</i>ADD TO FAVOURITES</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 offset-md-1">
                            <div className="row">
                                <div className="ml-5">
                                    <h1>{this.props.productTitle}</h1>
                                </div>
                            </div>
                            <hr />
                            <div className="row ml-5">
                                <div className="form-group">
                                    <span className='product-page-label'>Product Code :</span> {this.props.productId}
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
                                        <NumericInput className="form-control" step={this.props.step} value={this.state.quantity} min={0} id="quantity" onChange={() => this.calculateTotal()} />
                                        <small className='text text-muted'>Sold in quantities of {this.props.step}</small>
                                    </div>
                                </form>
                            </div>
                            <div className="ml-5 form-group">
                                <label className='product-page-label'>Filters:</label>
                                <p>Add Filters over here.</p>
                            </div>
                            <hr />
                            <div className="row ml-5">
                                <label className='product-page-label'>Description:</label>
                                <p className='product-description'>
                                    {this.props.content}
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