import React, { Component } from 'react';
import './ProductsList.css';
import ProductCard from '../ProductListCard/ProductListCard';

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
            <div className='col-md-12'>
                <div className='row'>
                    <div className='col-md-10'></div>
                    <div className='col-md-2'>
                        <a className='btn btn-dark add-product-btn' href='/addProduct'><i class="material-icons add-icon">add_box</i>&nbsp;<span className='add-icon-text'>ADD PRODUCT</span></a>
                    </div>
                </div>
                <div className="row m-3">
                    {this.listItems}
                </div>
            </div>
        )
    }
}

export default ProductListPage;