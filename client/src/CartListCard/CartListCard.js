import React, { Component } from 'react';
import './CartListCard.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import NumericInput from 'react-numeric-input';
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
//import $ from 'jquery';


// let cart = {
//     cartListItems: [
//       {
//         productName: 'Product1',
//         productId: '124jfwoq',
//         imageUrl: require('./assets/images/prod1.jpeg'),
//         quantity: 100,
//         rate: 23,
//         step: 100,
//         defaultQuantity: 100
//       },
//       {
//         productName: 'Product2',
//         productId: '124j441oq',
//         imageUrl: require('./assets/images/prod2.jpeg'),
//         quantity: 34,
//         rate: 12,
//         step: 23,
//         defaultQuantity: 20
//       }, {
//         productName: 'Product3',
//         productId: '124jfw642',
//         imageUrl: require('./assets/images/prod3.jpeg'),
//         quantity: 87,
//         rate: 12,
//         step: 50,
//         defaultQuantity: 200
//       }, {
//         productName: 'Product4',
//         productId: '2343jfwoq',
//         imageUrl: require('./assets/images/prod4.jpeg'),
//         quantity: 12,
//         rate: 10,
//         step: 200,
//         defaultQuantity: 150
//       }, {
//         productName: 'Product5',
//         productId: '124j890',
//         imageUrl: require('./assets/images/prod5.jpeg'),
//         quantity: 123,
//         rate: 9,
//         step: 100,
//         defaultQuantity: 50
//       }
//     ]
//   }


class CartListCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalAmt: this.props.rate * this.props.quantity,
            newQuantity: this.props.quantity
        };
    }

    calculateTotal = () => {
        this.setState((state, props) => ({
            newQuantity: document.getElementById('quantity' + this.props.productId).value,
        }));
        this.updateTotal();
    }

    updateTotal = () => {
        this.setState((state, props) => ({
            totalAmt: props.rate * state.newQuantity
        }));
    }

    componentWillUpdate() {
        this.props.updateGrandTotal(-this.state.totalAmt);
    }

    componentDidMount() {
        this.props.updateGrandTotal(this.state.totalAmt);
    }

    componentDidUpdate() {
        this.props.updateGrandTotal(this.state.totalAmt);
    }


    render() {
        return (
            <Card className='card ml-3 m-2'>
                <CardHeader title={this.props.productName} subheader={'Product ID: ' + this.props.productId} />
                <CardMedia className='media'>
                    <div className='container'>
                        <img src={this.props.imageUrl} alt='ProductImage' className='prodImage' />
                    </div>
                </CardMedia>
                <CardContent>
                    <div>
                        <span className='text text-muted'>Rate: &#8377;{this.props.rate} for a pack of {this.props.defaultQuantity} </span><br />
                        <span className='text text-muted'>Quantity:
                            <NumericInput step={this.props.step} value={this.state.newQuantity} min={0} id={'quantity' + this.props.productId} onChange={() => this.calculateTotal()} />
                        </span>
                    </div>
                    <div>
                        <span className='totalAmount'>&#8377;{this.state.totalAmt}</span>
                    </div>
                    {/* Add Filters*/}
                </CardContent>
                <hr />
                <CardActions>
                    <Button variant='contained' color='primary' className='ml-2 mb-2'>REMOVE FROM CART</Button>
                    <Fab color='secondary' aria-label='Add To Favourites' className='ml-4 mb-2'>
                        <i className='material-icons'>favorite</i>
                    </Fab>
                </CardActions>
            </Card>
        )
    }
}

export default CartListCard;