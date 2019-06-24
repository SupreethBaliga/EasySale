import React, { Component } from 'react';
import './ProductListPage.css';
import ProductCard from '../ProductCard/ProductCard';

class ProductListPage extends Component {
    /*constructor(props) {
        super(props);
        this.state = {

        }
    }*/

    listItems = this.props.products.map((product) => {
        return (
            <ProductCard key={product.id} {...product} />
        );
    });

    render() {
        return (
            <div className="row m-3">
                {this.listItems}
            </div>
        )
    }
}

export default ProductListPage;