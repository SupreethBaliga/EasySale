import React, { Component } from 'react';
import './ProductListCard.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

class ProductCard extends Component {

    constructor(props) {
        super(props);
        let images = require.context("../assets/images");
        this.state = {
            totalAmount: this.props.rate * this.props.step,
            image: images('./' + this.props.image)
        }
    }


    render() {
        return (
            <Card className='card m-3 ml-2'>
                <CardHeader title={this.props.name} subheader={"Product ID: " + this.props.id} className='card-header-prod'/>
                <CardMedia className='media'>
                    <div className="container">
                        <img src={this.state.image} alt={this.props.name} className='prodImage'></img>
                    </div>
                </CardMedia>
                <CardContent className='card-content'>
                    <div>
                        <span className='totalAmt'> &#8377; {this.state.totalAmount}</span>&nbsp;&nbsp;
                        <span className='minQuantity'>for pack of {this.props.step}</span>
                    </div>
                    <Typography variant="body" color="textSecondary" component="p">
                        {this.props.description}
                    </Typography>
                </CardContent>
                <CardActions className='card-actions'>
                    <a href={'/seller/product/' + this.props.id}>
                        <Button variant="contained" color="primary">VIEW PRODUCT</Button>
                    </a>
                </CardActions>
            </Card>
        )
    }
}

export default ProductCard;
