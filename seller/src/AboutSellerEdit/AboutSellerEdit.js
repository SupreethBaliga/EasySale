import React, { Component } from 'react';
import './AboutSellerEdit.css';
import axios from 'axios';


class AboutSellerEdit extends Component {

    // constructor(props) {
    //     super(props);
    //     // this.state = {
    //     //     details: []
    //     // }
    // }

    // handleSubmit(event){
    //    // event.preventDefault();

    // }




    render() {
        return (
            <div className='col-md-12'>
                <div className='row edit-profile-top-bar'>
                    <div className='col-md-11'>
                        EDIT ABOUT SELLER
                    </div>
                    <div className='col-md-1'>
                        <button form='about-seller-edit' type='submit' className='btn btn-dark' onClick={this.handleSubmit()}><i className='material-icons'>save</i>&nbsp;<span className='saveTest'>SAVE</span></button>
                    </div>
                </div>
                <div className='col-md-6 offset-md-3 mt-3'>
                    <form action='' method='post' id='about-seller-edit'>
                        <div className='form-group'>
                            <label className='labelText'>Name Of The Seller:</label>
                            <input type='text' className='form-control' />
                        </div>
                        <div className='form-group'>
                            <label className='labelText'>Description:</label>
                            <textarea className='form-control' rows='4'></textarea>
                        </div>
                        <div className='form-group'>
                            <label className='labelText'>Instructions:</label>
                            <textarea className='form-control' rows='4'></textarea>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default AboutSellerEdit;