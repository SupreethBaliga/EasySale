import React, { Component } from "react";
import "./ProductPage.css";
import axios from 'axios';

class ProductPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: {},
            image: "",
            step:"",
            rate: ""
        }
    }


    componentDidMount() {
        var patharray = window.location.pathname.split("/");
        var id = patharray[3];
        axios.get("/api/products/" + id)
            .then(res => {
                var data = res.data;
                this.setState((state, props) => ({
                    product: data,
                    step: this.state.product.step,
                    rate: this.state.product.rate
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
        axios.delete("/api/products/" + this.state.product.id)
            .then(res => {
                console.log("Product Deleted");
            })
            .catch(err => {
                console.log(err);
            });
        window.location.pathname= '/seller/products';
    }
    handleClick(){
        axios.put("/api/products/"+this.state.product.id,{
            "rate":this.state.rate,
            "step":this.state.step  
        })
        .then(res=>{
            window.location.pathname = '/seller/products';
        })
        .catch(error=>{
            console.log(error);
        })
    }
    changeStep(){
        this.setState({
            step: document.getElementById("step_product_page").value
        })
    }
    changeRate(){
        this.setState({
            rate: document.getElementById("rate_product_page").value
        })
    }

    render() {
        return (
            <div className="col-md-12 prod-page-background">
                    <div className="row">
                        <div className="col-md-4 offset-md-1">
                            <div className='row'>
                            <img src={this.state.image} alt={this.state.product.name} height="550px" width="650px" className="productImage" />                            </div>
                            <br />
                            <div className='row form-group'>
                                <div className='col-md-6 offset-md-3'>
                                    <button className='btn btn-primary remove-prod-btn form-control' type='button' onClick={() => this.removeProduct()}><i className='material-icons'>remove_circle_outline</i>&nbsp;REMOVE PRODUCT</button>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-1'></div>
                        <div className="col-md-5 prod-details-div">
                            <div className="row">
                                <div className="ml-5">
                                    <h1 className='product-page-prod-name'>{this.state.product.name}</h1>
                                </div>
                            </div>
                            <hr />
                            <div className="row ml-5 product-id-seller">
                                <span className='product-page-label'>Product Code :&nbsp;&nbsp;</span> {this.state.product.id}
                            </div>
                            <hr />
                            <div className="ml-5">
                                <div className="form-group">
                                    <label className='product-page-label'>Sold In Packs Of:&nbsp;</label>
                                    <input id="step_product_page" onChange={()=>this.changeStep()} type='text' className='form-control' placeholder={this.state.product.step}/>
                                </div>
                                <div className='form-group'>
                                    <label className='product-page-label'>Rate:</label>
                                    <input id="rate_product_page" onChange={()=>this.changeRate()} type='text' className='form-control' placeholder={this.state.product.rate}/>
                                </div>
                                <div className='form-group col-md-8 offset-md-2'>
                                    <button onClick={()=>this.handleClick()} className='btn btn-dark form-control update-details-btn'>Update Details</button>
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
        );
    }
}

export default ProductPage;
