import React, { Component } from "react";
import './NavBar.css';
import axios from 'axios';

class NavBar extends Component {

    handleLogout = () => {
        console.log("For Logout");
        axios.get('http://localhost:8000/api/logout')
            .then(res => {
                console.log("Before Logout");
                console.log(res);
                console.log("Logged Out");
            })
            .then(res => {
                window.location.pathname = "/login";
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark col-md-12">
                <center>
                    <a className="navbar-brand" href="/">EasySale</a>
                </center>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="nav mr-auto">
                        <li className="nav-item active" data-toggle="collapse" data-target=".navbar-collapse">
                            <a className="nav-link" href="/products">
                                <i className="material-icons">border_all</i>
                                Products
                            </a>
                        </li>
                        <li className="nav-item active" data-toggle="collapse" data-target=".navbar-collapse">
                            <a className="nav-link" href="/myOrders">
                                <i className="material-icons">list_alt</i>
                                My Orders
                            </a>
                        </li>
                        <li className="nav-item active" data-toggle="collapse" data-target=".navbar-collapse">
                            <a className="nav-link" href="/cart">
                                <i className="material-icons">add_shopping_cart</i>
                                Cart
                            </a>
                        </li>
                        <li className="nav-item active" data-toggle="collapse" data-target=".navbar-collapse">
                            <a className="nav-link" href="/favourites">
                                <i className="material-icons">favorite</i>
                                Favorites
                            </a>
                        </li>
                    </ul>

                    <ul className="nav ml-auto right">
                        <li className="nav-item active" data-toggle="collapse" data-target=".navbar-collapse">
                            <a className="nav-link" href="/profile">
                                <i className="material-icons">account_circle</i>
                                My Profile
                            </a>
                        </li>
                        <li className="nav-item active" data-toggle="collapse" data-target=".navbar-collapse">
                            <button className="nav-link btn" onClick={() => this.handleLogout()}>
                                <i className="material-icons">input</i>
                                &nbsp;Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default NavBar;