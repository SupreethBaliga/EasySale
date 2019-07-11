import React, { Component } from 'react';
import './ProductListPage.css';
import ProductCard from '../ProductCard/ProductCard';
import axios from 'axios';
class ProductListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        axios.get('/api/products')
            .then(res => {
                const persons = res.data;
                this.setState({
                    products: persons.rows
                });
                this.populate();
            });
    }

    listItems = [];

    populate = () => {
        this.listItems = this.state.products.map((product) =>
            <ProductCard key={product.id} {...product} />
        );
        this.setState((state,props) => ({
            products: state.products
        }))

    }

    render() {
        return (
            <div className="row product-list-page">
                {this.listItems}
            </div>
        )
    }
}

export default ProductListPage;
