import React, { Component } from "react";
import './NavBar.css';

class NavBar extends Component {
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
                                Orders
                            </a>
                        </li>
                        <li className="nav-item active" data-toggle="collapse" data-target=".navbar-collapse">
                            <a className="nav-link" href="/favourites">
                                <i className="material-icons">account_circle</i>
                                Users
                            </a>
                        </li>
                    </ul>

                    <ul className="nav ml-auto right">
                        <li className="nav-item active" data-toggle="collapse" data-target=".navbar-collapse">
                            <a className="nav-link" href="/home">
                                <i className="material-icons">input</i>
                                &nbsp;Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default NavBar;