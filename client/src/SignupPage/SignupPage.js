import React, { Component } from 'react';
import './SignupPage.css';

class SignupPage extends Component {
    render() {
        return (
            <div className='signup-page'>
                <br />
                <form action='' method='post'>
                    <div className='bordered-section ml-2 mr-2 mb-2'>
                        <span className='section-header'><u>Personal Details</u>:<span className='asterisk'>*</span></span>
                        <div className='col-sm-12'>
                            <div className='form-group'>
                                <label className='signupLabelText'>Customer Name: </label>
                                <input type='text' className='form-control' />
                            </div>
                            <div className='form-group'>
                                <div className='row'>
                                    <div className='col-sm-7'>
                                        <div className='form-group'>
                                            <label className='signupLabelText'>Email Id: </label>
                                            <input type='email' className='form-control' placeholder='abc@example.com' />
                                        </div>
                                    </div>
                                    <div className='col-sm-5'>
                                        <div className='form-group'>
                                            <label className='signupLabelText'>Mobile No: </label>
                                            <input type='text' className='form-control' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='form-group'>
                                <div className='row'>
                                    <div className='col-sm-8'>
                                        <label className='signupLabelText'>Delivery Address:</label>
                                        <textarea className='form-control'></textarea>
                                    </div>
                                    <div className='col-sm-4'>
                                        <label className='signupLabelText'>Delivery Postal Code:</label>
                                        <input type='text' className='form-control' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='bordered-section ml-2 mr-2 mb-2'>
                        <span className='section-header'><u>Organisation Details</u>:&nbsp;<small className='text text-muted'>(Only if you are an organisation)</small></span>
                        <div className='col-sm-12'>
                            <div className='form-group'>
                                <label className='signupLabelText'>Organisation Name: </label>
                                <input type='text' className='form-control' />
                            </div>
                            <div className='form-group'>
                                <div className='row'>
                                    <div className='col-sm-7'>
                                        <div className='form-group'>
                                            <label className='signupLabelText'>GST No: </label>
                                            <input type='email' className='form-control' />
                                        </div>
                                    </div>
                                    <div className='col-sm-5'>
                                        <div className='form-group'>
                                            <label className='signupLabelText'>Landline No: </label>
                                            <input type='text' className='form-control' placeholder='Example: 022-29207477' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='form-group'>
                                <div className='row'>
                                    <div className='col-sm-8'>
                                        <label className='signupLabelText'>Company Address:</label>
                                        <textarea className='form-control'></textarea>
                                    </div>
                                    <div className='col-sm-4'>
                                        <label className='signupLabelText'>Company Postal Code:</label>
                                        <input type='text' className='form-control' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className='form-group col-md-6 offset-sm-3'>
                        <button type='submit' className='btn btn-dark form-control button'>SIGN-UP</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignupPage;