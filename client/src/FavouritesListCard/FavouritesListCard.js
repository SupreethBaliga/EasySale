import React, { Component } from 'react';
import './FavouritesListCard.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import axios from 'axios';

class FavouritesListCard extends Component {
    constructor(props){
        let images = require.context('../assets/images');
        super(props);
        this.state = {
            image: images('./' + this.props.image)
        }
    }

    removeFavourite(){
        var user_id = "";
        var url = ""
        axios.get("/api/getuser")
        .then(res=>{
            user_id = res.data.id;
            url = "/api/favs/"+user_id+"/"+this.props.id;
        })
        .then(res=>{
            axios.delete(url)
            .then(res => {
                window.location.pathname='/favourites';
           })
        })
        .catch(error=>{
            console.log(error);
        })
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
                        <span class="description text text-muted">Rate: &#8377; {this.props.rate} for pack of {this.props.step}</span>
                    </div>
                    <Typography variant="body" color="textSecondary" component="p">
                        {this.props.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <a href={'/product/' + this.props.id}><Button variant='contained' color='primary' className='m-1'>VIEW PRODUCT</Button></a>
                    <Button onClick={()=> this.removeFavourite()} variant='contained' color='secondary'>REMOVE FROM FAVOURITES</Button>
                </CardActions>
            </Card>
        )
    }
}

export default FavouritesListCard;
