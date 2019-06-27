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
            <div className="col-sm-12 mt-5">
                <button className="btn btn-primary addToCart"><i className='material-icons'>add_shopping_cart</i>ADD TO CART</button>
                <button className="btn btn-primary addToFav"><i className='material-icons'>ADD TO FAVOURITES</i></button>
                <div className="container background">
                    <div className="row">
                        <div className="col-md-4">
                            <img src={this.props.imageLink} alt="Help" height="400px" width="350px" className="productImage" />
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
                                    Product Code : {this.props.productId}
                                </div>
                            </div>
                            <hr />
                            <div className="ml-5">
                                <form>
                                    <div className="form-group">
                                        <p className="totalRate">&#8377; {this.state.totalAmt} </p>
                                    </div>
                                    <div className="form-group">
                                        <span>Quantity:</span>
                                        <NumericInput className="form-control" step={this.props.step} value={this.state.quantity} min={0} id="quantity" onChange={() => this.calculateTotal()} />
                                        <small>Sold in quantities of {this.props.step}</small>
                                    </div>
                                </form>
                            </div>
                            <div className="ml-1 form-group">
                                <label>Filters:</label>
                                <p>Add Filters over here.</p>
                            </div>
                            <hr />
                            <div className="row ml-5">
                                <label>Description:</label>
                                <p>
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