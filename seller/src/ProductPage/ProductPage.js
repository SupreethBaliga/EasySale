import React, { Component } from "react";
import "./ProductPage.css";
import axios from 'axios';

class ProductPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: {},
            image: ""
        }
    }


    componentDidMount() {
        var patharray = window.location.pathname.split("/");
        // console.log(patharray[2]);
        var id = patharray[3];
        axios.get("http://localhost:8000/api/products/" + id)
            .then(res => {
                var data = res.data;
                this.setState((state, props) => ({
                    product: data
                }));
            })
            .then(res => {
                this.updateData();
            })
            .catch(err => {
                console.log(err);
            })
    }

    updateData = () => {
        let images = require.context('../assets/images');
        this.setState((state, props) => ({
            image: images('./' + state.product.image)
        }))
    }

    removeProduct = () => {
        axios.delete("http://localhost:8000/api/products/" + this.state.product.id)
            .then(res => {
                console.log("Product Deleted");
            })
            .catch(err => {
                console.log(err);
            });
        window.location.pathname= '/seller/products';
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
                                <div className='col-md-6 offset-md-3'>
                                    <button className='btn btn-dark remove-prod-btn' type='button' onClick={() => this.removeProduct()}><i className='material-icons'>remove_circle_outline</i>&nbsp;REMOVE PRODUCT</button>
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
                                <div className="form-group">
                                    <span className='product-page-label'>Sold In Packs Of:&nbsp;</span>
                                    <span className='product-description'>{this.state.product.step}</span>
                                </div>
                                <br />
                                <div className='form-group'>
                                    <span className='product-page-label'>Rate:&nbsp;</span>
                                    <span className='product-description'>{this.state.product.rate}</span>
                                </div>
                            </div>
                            <br />
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