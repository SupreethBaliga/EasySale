import React, { Component } from 'react';
import './AboutSeller.css';

var images;
class AboutSeller extends Component {

    constructor(props) {
        super(props);
        images = require.context('../assets/images');
    }


    render() {
        return (
            <div>
            <div className='container col-md-12 about-seller-page'>
                <div className='image-div-about-seller col-md-12'>
                    <img src={images('./aboutSellerImage2.jpg')} width="1900px" height="500px" alt='about-seller' className='image-about-seller'/>
                    <center><h1 className='seller-title'>Seller XYZ</h1></center>
                </div>
                <br />
                <div className='row'>
                    <div className='col-md-5 about-seller-details ml-5'>
                        <div className='about-seller-details-title'>
                            <center>About Us</center>
                        </div>
                        <hr/>
                        <div className='text text-dark about-seller-text'>
                            <p>We, Seller XYZ, specialise in manufacturing paper products and have been in business since 1990's. We sell products like files, clips and other stationary articles. We provide free delivery within a business week on an average. The time of delivery may vary according to the size of the order.</p>
                            <br/><br/>
                            
                            <p>For more details contact:<br/>
                                <b>Supreeth Baliga,</b> <br/>
                                <b>Mobile No.:</b> 1234567800, <br/>
                                <b>Landline No.:</b> 031-12341214 <br/>
                                <b>Address:</b> Shop No.12, New Shopping Centre, <br/>
                                Indian Institute of Technology, Kanpur.
                            </p>
                        </div>
                    </div>
                    <div className='col-md-6 ml-5 about-seller-details'>
                        <div className='about-seller-details-title'>
                            <center>Instructions</center>
                        </div>
                        <hr/>
                        <div className='text text-dark about-seller-text'>
                            The buyers are requested to please go through the following instructions before starting transactions with the seller: <br/><br/>
                            1. The client adds his products to the cart and places his order for review by the seller. <br/>
                            2. The seller then goes through the order requested and accepts or rejects the order depending on the various factors which depend on the seller. <br/>
                            3. Once the order is accepted, the client has to pay advanced payment after which the client can view the status of his order which will regularly be updated by the seller. <br/>
                            4. Once the order is delivered, the client has to pay the remaining amount.<br/>
                            5. The buyer will receive the invoice of his order once the payment is completed.
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }

}

export default AboutSeller;
