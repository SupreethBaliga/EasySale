import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import './AddProduct.css';

class AddProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageSelected: false,
            imageSelectedLink: null
        }
    }

    render() {
        return (
            <div className='col-md-12 add-product-page'>
                <form id='add-product-form' className='add-product-form-class'>
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
                                            <input type='file' className='form-control'></input>
                                        </div>
                                        <div className='col-md-4'>
                                            <button className='btn btn-dark form-control'>Upload</button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className='col-md-5'>
                            <div className='form-group'>
                                <label className='prodLabelText'>Product Name:</label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='form-group'>
                                <label className='prodLabelText'>Product ID:</label>
                                <input className='form-control' type='text' />
                            </div>
                            <div className='form-group'>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <label className='prodLabelText'>Rate Per Piece(&#8377;):</label>
                                        <input className='form-control' type='text' />
                                    </div>
                                    <div className='col-md-6'>
                                        <label className='prodLabelText'>Sold in Packs of:</label>
                                        <input className='form-control' type='text' />
                                    </div>
                                </div>
                            </div>
                            <div className='form-group'>
                                <label className='prodLabelText'>Description:</label>
                                <textarea className='form-control' rows='4' />
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