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
    listItems = [];
    listItems2 = [];
    componentDidMount(){
        var user_id = "";
        Axios.get("/api/getuser")
        .then(res => {
            user_id = res.data.id;
        })
        .then(res => {
            Axios.get("/api/favs/"+user_id)
            .then(res=>{
                const fav = res.data;
                this.setState({
                    favs: fav.rows
                });

                this.state.favs.map((product)=>{
                    Axios.get("/api/products/"+product.id)
                    .then(res=>{
                        var data = res.data;
                        this.listItems2.push(data);
                        this.populate();
                    })
                    .catch(error=>{
                        console.log(error);
                    })
                    return null;
                })
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
        this.listItems3 = this.state.listItems2.map((product) => {
            
            return (<FavouritesListCard key={product.id} {...product} />)
            
        });
        this.setState((state,props)=>({
            favs: state.favs
        }))
    }

    render() {
        return (
            <div className='row m-3'>
                {this.listItems3}
            </div>
        );
    }

}

export default FavouritesList;