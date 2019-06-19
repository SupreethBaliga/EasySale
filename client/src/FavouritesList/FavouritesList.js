import React, { Component } from 'react';
import './FavouritesList.css';
import FavouritesListCard from '../FavouritesListCard/FavouritesListCard';

class FavouritesList extends Component {

    favourites = this.props.products.map((product) => {
        return (
            <FavouritesListCard key={product.id} {...product} />
        )
    });

    render() {
        return (
            <div className='row m-3'>
                {this.favourites}
            </div>
        );
    }

}

export default FavouritesList;