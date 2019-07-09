import React, { Component } from "react";
import './NavBar.css';
import axios from 'axios';

class NavBar extends Component {

    handleLogout = () => {
        console.log("For Logout");
        axios.get('/api/logout')
            .then(res => {
                console.log("Before Logout");
                console.log(res);
                console.log("Logged Out");
            })
            .then(res => {
                window.location.assign("//easysale.live/login");
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
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="nav mr-auto">
                        <li className="nav-item active" data-toggle="collapse" data-target=".navbar-collapse">
                            <a className="nav-link" href="/seller/products">
                                <i className="material-icons">border_all</i>
                                Products
                            </a>
                        </li>
                        <li className="nav-item active" data-toggle="collapse" data-target=".navbar-collapse">
                            <a className="nav-link" href="/seller/orders">
                                <i className="material-icons">list_alt</i>
                                Orders
                            </a>
                        </li>
                        <li className="nav-item active" data-toggle="collapse" data-target=".navbar-collapse">
                            <a className="nav-link" href="/reqorders">
                                <i className="material-icons">assignment_returned</i>
                                Order Requests
                            </a>
                        </li>
                    </ul>

                    <ul className="nav ml-auto right">
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