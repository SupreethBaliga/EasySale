import React, { Component } from "react";
import "./ProductPage.css";

class ProductPage extends Component {


    // let productPageProps = {
    //   rate: 4,
    //   productId: "oi2j812u082u4",
    //   imageLink: require('./assets/images/prod5.jpeg'),
    //   content: "woihjwiorhe1 uwhdouqh qiehqw oiqheioqhe qoiehiqowhe oqihweio iiqheioqhe qioeqiowje oqehqwioheioqh ohqroihwrhqiorh",
    //   productTitle: "Prod5",
    //   step: 100,
    //   defaultValue: 100
    // }

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
                                <div className='col-md-6 offset-md-3'>
                                    <button className='btn btn-dark remove-prod-btn'><i className='material-icons'>remove_circle_outline</i>&nbsp;REMOVE PRODUCT</button>
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
                                <div className="form-group">
                                    <span className='product-page-label'>Sold In Packs Of:&nbsp;</span>
                                    <span className='product-description'>{this.props.step}</span>
                                </div>
                                <br />
                                <div className='form-group'>
                                    <span className='product-page-label'>Rate:&nbsp;</span>
                                    <span className='product-description'>{this.props.rate}</span>
                                </div>
                            </div>
                            <br />
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