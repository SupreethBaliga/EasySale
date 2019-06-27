import React, { Component } from 'react';
import './AboutSeller.css';

class AboutSeller extends Component {

    render() {
        return (
            <div>
                <div className='container'>
                    <center><h1 className='seller-title'>Seller 123hroqwhfouqwhfh</h1></center>
                    <br />
                    <div className='row'>
                        <div className='col-sm-5 m-3'>
                            <div className='text text-dark'>
                                This the description of the seller. Djna adina andassndaio andasljdn kaksnjsan n kasjnan ofknaksnfason foansoifnasif.
                            </div>
                        </div>
                        <div className='col-sm-5 m-3'>
                            <div className='text text-dark'>
                                These are the instructions which will be displayed to be shown to the client
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default AboutSeller;