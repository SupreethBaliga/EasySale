import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import './AddProduct.css';
import axios from 'axios';
class AddProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageSelected: false,
            imageSelectedLink: null,
            name: "",
            id: "",
            image: "",
            description: "",
            rate: 0,
            step: 0,
            file: null
        }
    }

    handleSaveClick = (event) => {

        var params = {
            "name": this.state.name,
            "id": this.state.id,
            "image": this.state.image,
            "description": this.state.description,
            "rate": this.state.rate,
            "step": this.state.step
        }
        const imageurl = "/api/imageupload";
        const formdata = new FormData();
        formdata.append('imagefile', this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post(imageurl, formdata, config)
            .then(res => console.log("Image Uploaded"))
            .catch(err => console.log(err));


        axios.post("/api/products/", params)
            .then(res => { 
                console.log("Product Created");
                window.location.href = '/seller/products'
            })
            .catch(err => console.log(err));
    }

    onChangeProductName = (event) => {
        this.setState((state, props) => ({
            name: document.getElementById('product_name_add_product').value
        }));
        // console.log(this.state.name);
    }

    onChangeProductId = (event) => {
        this.setState((state, props) => ({
            id: document.getElementById("product_id_add_product").value
        }));
        // console.log(this.state.id);
    }

    onChangeRate = (event) => {
        this.setState((state, props) => ({
            rate: parseInt(document.getElementById("rate_add_product").value)
        }));
        // console.log(this.state.rate+2);
    }

    onChangeStep = (event) => {
        this.setState((state, props) => ({
            step: parseInt(document.getElementById("step_add_product").value)
        }));
        // console.log(this.state.step + 2);
    }

    onChangeDescription = (event) => {
        this.setState((state, props) => ({
            description: document.getElementById("description_add_product").value
        }));
        // console.log(this.state.description);
    }

    onImageUpload = (event) => {
        var imageFile = document.getElementById("image_file_add_product");
        var res = imageFile.value.split('\\');
        this.setState((state, props) => ({
            image: res[2],
            file: document.getElementById("image_file_add_product").files[0]
        }));
        // console.log("Image Uploaded");
    }
    render() {
        return (
            <div className='col-md-12 add-product-page'>
                <form id='add-product-form' className='add-product-form-class'>
                    <div className='row'>
                        <div className='col-md-10'></div>
                        <div className='col-md-2'>
                            <button className='btn btn-dark add-product-save' form='add-product-form' type='button' onClick={() => this.handleSaveClick()}>SAVE</button>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-4 offset-md-1'>
                            <Card className='add-product-img-card'>
                                <CardHeader subheader="Upload Product Image" className='add-product-cardheader' />
                                <CardMedia className='add-product-cardmedia'>
                                    {(() => {
                                        switch (this.state.imageSelected) {
                                            case true: return <img className='text text-muted' alt='Failed to Load' />;
                                            default: return <span className='text text-muted img-not'>Image Not Provided</span>
                                        }
                                    })()}
                                </CardMedia>
                                <CardContent>
                                    <div className='row'>
                                        <div className='col-md-8'>
                                            <input type='file' className='form-control' id='image_file_add_product' onChange={() => this.onImageUpload()}></input>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className='col-md-5'>
                            <div className='form-group'>
                                <label className='prodLabelText'>Product Name:</label>
                                <input className='form-control' type='text' id="product_name_add_product" onChange={() => this.onChangeProductName()} />
                            </div>
                            <div className='form-group'>
                                <label className='prodLabelText'>Product ID:</label>
                                <input className='form-control' type='text' id="product_id_add_product" onChange={() => this.onChangeProductId()} />
                            </div>
                            <div className='form-group'>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <label className='prodLabelText'>Rate Per Piece(&#8377;):</label>
                                        <input className='form-control' type='text' id='rate_add_product' onChange={() => this.onChangeRate()} />
                                    </div>
                                    <div className='col-md-6'>
                                        <label className='prodLabelText'>Sold in Packs of:</label>
                                        <input className='form-control' type='text' id="step_add_product" onChange={() => this.onChangeStep()} />
                                    </div>
                                </div>
                            </div>
                            <div className='form-group'>
                                <label className='prodLabelText'>Description:</label>
                                <textarea className='form-control' rows='4' id="description_add_product" onChange={() => this.onChangeDescription()} />
                            </div>
                        </div>
                        <div className='col-md-1'></div>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddProduct;