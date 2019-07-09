import React, { Component } from 'react';
import './CartListCard.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import NumericInput from 'react-numeric-input';
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button';
import axios from 'axios';

var user_id = "";
class CartListCard extends Component {
    constructor(props) {
        super(props);
        let images = require.context('../assets/images');
        this.state = {
            totalAmt: this.props.rate * this.props.quantity,
            newQuantity: this.props.quantity,
            image: images('./' + this.props.image)
        };
    }

    calculateTotal = () => {
        this.setState((state, props) => ({
            newQuantity: document.getElementById('quantity' + this.props.id).value,
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

    handleRemoveFromCart = () => {
        axios.get('/api/getuser/')
            .then(res => {
                user_id = res.data.id;
                console.log("Id Received");
            })
            .then(res => {
                axios.delete("/api/cart/" + user_id + '/' + this.props.id)
                    .then(res => {
                        console.log("Product Deleted");
                        window.location.href = '/cart';
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err);
            });
        // window.location.href='/cart';
    }

    render() {
        return (
            <Card className='card ml-3 m-2'>
                <CardHeader title={this.props.name} subheader={'Product ID: ' + this.props.id} />
                <CardMedia className='media'>
                    <div className='container'>
                        <img src={this.state.image} alt={this.props.name} className='prodImage' />
                    </div>
                </CardMedia>
                <CardContent>
                    <div>
                        <span className='text text-muted'>Rate: &#8377;{this.props.rate} for a pack of {this.props.step} </span><br />
                        <span className='text text-muted'>Quantity:
                            <NumericInput step={this.props.step} value={this.state.newQuantity} min={this.props.step} id={'quantity' + this.props.id} onChange={() => this.calculateTotal()} />
                        </span>
                    </div>
                    <div>
                        <span className='totalAmount'>&#8377;{this.state.totalAmt}</span>
                    </div>
                    {/* Add Filters*/}
                </CardContent>
                <hr />
                <CardActions>
                    <Button variant='contained' color='primary' className='ml-2 mb-2' onClick={() => this.handleRemoveFromCart()}>REMOVE FROM CART</Button>
                </CardActions>
            </Card>
        )
    }
}

export default CartListCard;