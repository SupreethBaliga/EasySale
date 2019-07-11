import React, { Component } from 'react';
import './FavouritesList.css';
import FavouritesListCard from '../FavouritesListCard/FavouritesListCard';
import Axios from 'axios';

class FavouritesList extends Component {
    constructor(props){
        super(props);
        this.state = {
            favs: []
            
        }
    }
    listItems2 = [];
    componentDidMount(){
        var user_id = "";
        Axios.get("/api/getuser")
        .then(res => {
            if(res.data == null) window.location.href = '/';
            else if(res.data.email==="admin@gmail.com") window.location.assign("//seller.easysale.live/");
            else user_id = res.data.id;
        })
        .then(res => {
            Axios.get("/api/favs/"+user_id)
            .then(res=>{
                const fav = res.data;
                this.setState({
                    favs: fav.product_id
                });
                for(var i=0;i<this.state.favs.length;i++){
                    Axios.get("/api/products/"+this.state.favs[i])
                    .then(res=>{
                        var data = res.data;
                        this.listItems2.push(data);
                        this.populate();
                    })
                    .catch(error=>{
                        console.log(error);
                    })
                }
            })
            .catch(error=>{
                console.log(error);
            })
        })
        .catch(error=>{
            console.log(error);
        })
        
    }
    listItems3 = [];
    populate = () =>{
        this.listItems3 = this.listItems2.map((product) => {
            return (<FavouritesListCard key={product.id} {...product} />)
        });
        this.setState((state,props)=>({
            favs: state.favs
        }))
    }

    render() {
        return (
            <div className='col-md-12'>
                <div className='row favourites-list-page'>
                    {this.listItems3}
                </div>
            </div>
        );
    }

}

export default FavouritesList;
