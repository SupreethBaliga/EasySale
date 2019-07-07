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
        // console.log(patharray[2]);
        var id = patharray[3];
        axios.get("http://localhost:8000/api/products/" + id)
            .then(res => {
                var data = res.data;
                this.setState((state, props) => ({
                    product: data,
                    step: this.state.products.step,
                    rate: this.state.products.rate
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
    handleClick(){
        // var url = "/api/products/";
        // axios.get("/api/getuser")
        // .then(res=>{
        //     user_id = res.data.id;
        //     url = url + user_id;
        // })
        // .then(res=>{
        //     axios.put(url+this.state.product.id,{
        //         "user_id":user_id
        //     })
        // })
        axios.put("/api/products/"+this.state.product.id,{
            "rate":this.state.product.rate,
            "step":this.state.product.step  
        })
        .then(res=>{
            console.log(res);    
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
                                    <label className='product-page-label'>Sold In Packs Of:&nbsp;</label>
                                    <input id="step_product_page" onChange={()=>this.changeStep()} type='text' className='form-control' placeholder={this.state.step}/>
                                </div>
                                <br />
                                <div className='form-group'>
                                    <label className='product-page-label'>Rate:</label>
                                    <input id="rate_product_page" onChange={()=>this.changeRate()} type='text' className='form-control' placeholder={this.state.rate}/>
                                </div>
                            </div>
                            <div className='form-group'>
                                <button onClick={()=>this.handleClick()} className='btn btn-dark form-control'>Update Details</button>
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