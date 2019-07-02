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
        axios.get('http://localhost:8000/api/products')
            .then(res => {
                const persons = res.data;
                console.log({ persons });
                this.setState({
                    products: persons.rows
                });
                console.log(this.state.products);
                this.populate();
            });
    }

    listItems = [];

    populate = () => {
        this.listItems = this.state.products.map((product) =>
            <ProductCard key={product.id} {...product} />
        );
        this.setState({
            products: this.state.products
        });
    }

    render() {
        return (
            <div className="row m-3">
                {this.listItems}
            </div>
        )
    }
}

export default ProductListPage;