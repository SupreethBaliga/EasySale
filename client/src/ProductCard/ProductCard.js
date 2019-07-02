import React, { Component } from 'react';
import './ProductCard.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Fab from '@material-ui/core/Fab';

// let prodprops = {
//   products: [
//     {
//       id: 1,
//       name: "Prod1",
//       description: "This is product 1. Enter some more description about it so that it looks as big as 4 to 5 lines. This is what I am trying to do right now but it doesn't seem to work. Keep on seeing. Still seeing. And still see.",
//       image: require('./assets/images/prod1.jpeg'),
//       rate: 4,
//       defaultQuantity: 100
//     },
//     {
//       id: 2,
//       name: "Prod2",
//       description: "This is product 2. Enter some more description about it so that it looks as big as 4 to 5 lines. This is what I am trying to do right now but it doesn't seem to work. Keep on seeing. Still seeing. And still see.",
//       image: require('./assets/images/prod2.jpeg'),
//       rate: 6,
//       defaultQuantity: 120
//     },
//     {
//       id: 3,
//       name: "Prod3",
//       description: "This is product 3. Enter some more description about it so that it looks as big as 4 to 5 lines. This is what I am trying to do right now but it doesn't seem to work. Keep on seeing. Still seeing. And still see.",
//       image: require('./assets/images/prod3.jpeg'),
//       rate: 5,
//       defaultQuantity: 100
//     },
//     {
//       id: 4,
//       name: "Prod4",
//       description: "This is product 4. Enter some more description about it so that it looks as big as 4 to 5 lines. This is what I am trying to do right now but it doesn't seem to work. Keep on seeing. Still seeing. And still see.",
//       image: require('./assets/images/prod4.jpeg'),
//       rate: 9,
//       defaultQuantity: 50
//     },
//     {
//       id: 5,
//       name: "Prod5",
//       description: "This is product 5. Enter some more description about it so that it looks as big as 4 to 5 lines. This is what I am trying to do right now but it doesn't seem to work. Keep on seeing. Still seeing. And still see.",
//       image: require('./assets/images/prod5.jpeg'),
//       rate: 7,
//       defaultQuantity: 130
//     }
//   ]
// }

class ProductCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            totalAmount: this.props.rate * this.props.step
        }
    }

    render() {
        return (
            <Card className='card m-3 ml-2'>
                <CardHeader title={this.props.name} subheader={"Product ID: " + this.props.id} />
                <CardMedia className='media'>
                    <div className="container">
                        <img src={this.props.image} alt={this.props.name} className='prodImage'></img>
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
                </CardActions>
            </Card>
        )
    }
}

export default ProductCard;