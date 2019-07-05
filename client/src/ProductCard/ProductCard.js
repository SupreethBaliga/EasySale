import React, { Component } from 'react';
import './ProductCard.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';

class ProductCard extends Component {

    constructor(props) {
        super(props);
        let images = require.context('../assets/images', true);
        this.state = {
            totalAmount: this.props.rate * this.props.step,
            image: images('./' + this.props.image)
        }
    }

    render() {
        return (
            <Card className='card m-3 ml-2'>
                <CardHeader title={this.props.name} subheader={"Product ID: " + this.props.id} />
                <CardMedia className='media'>
                    <div className="container">
                        <img src={this.state.image} alt={this.props.name} className='prodImage'></img>
                    </div>
                </CardMedia>
                <CardContent>
                    <div>
                        <span className='totalAmt'> &#8377; {this.state.totalAmount}</span>&nbsp;&nbsp;
                        <span className='minQuantity'>for pack of {this.props.step}</span>
                    </div>
                    <Typography variant="body" color="textSecondary" component="p">
                        {this.props.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Fab color="primary" aria-label="AddToCart" className='ml-2 mr-2'>
                        <i className="material-icons">add_shopping_cart</i>
                    </Fab>
                    <Fab color="secondary" aria-label="AddToFavourites" className='ml-2 mr-2'>
                        <i className="material-icons">favorite</i>
                    </Fab>
                    <a href={"/product/" + this.props.id}>
                        <Button variant='contained' color='primary'>VIEW PRODUCT</Button>
                    </a>
                </CardActions>
            </Card>
        )
    }
}

export default ProductCard;