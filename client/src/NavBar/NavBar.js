import React, { Component } from "react";
import './NavBar.css';

class NavBar extends Component {
       render() {
        return (
            <div>
                <nav class="navbar navbar-fixed-top">
                    <center>
                    <a class="brand" href="https://www.google.com">EasySale</a>
                    </center>
                    <br/>
                    <div class="navbarSupportedContent">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" href="">
                                    <i class="material-icons">border_all</i>
                                    Products
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/myorder">
                                    <i class="material-icons">list_alt</i>
                                    My Orders
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/cart">
                                    <i class="material-icons">add_shopping_cart</i>
                                    Cart
                                </a>
                            </li>
                            <li class="nav-item" >
                                <a class="nav-link" href="/favorites">
                                    <i class="material-icons">favorite</i>
                                    Favorites
                                </a>
                            </li>
                        </ul>

                        <ul class="navbar-nav navbar-right">
                            <li class="nav-item">
                                <a class="nav-link" href="/myprofile">
                                    <i class="material-icons">account_circle</i>
                                    My Profile
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/home">
                                    <i class="material-icons">input</i>
                                    &nbsp;Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default NavBar;