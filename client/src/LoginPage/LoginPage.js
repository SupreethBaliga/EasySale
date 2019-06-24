import React, { Component } from 'react';
import './LoginPage.css';

class LoginPage extends Component {

    changeToSignup = () => {
        this.props.changeToSignup();
    }

    render() {
        return (
            <div className='login-page'>
                <form action='' method='post'>
                    <br /><br /><br />
                    <div className='col-sm-10 offset-sm-1'>
                        <div className='form-group ml-2 mr-2 mb-2'>
                            <label className='loginLabelText'>Email:</label>
                            <input type='email' className='form-control' placeholder='abc@example.com' />
                        </div>
                        <div className='form-group ml-2 mr-2 mb-2'>
                            <label className='loginLabelText'>Password:</label>
                            <input type='password' className='form-control' />
                        </div>
                        <br />
                        <div className='form-group'>
                            <div className='col-sm-6 offset-sm-3'>
                                <button type='submit' className='btn btn-dark form-control button'>LOGIN</button>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <button type='button' className='btn btn-link form-control'>Forgot Password?</button>
                            </div>
                            <div className='col-sm-6'>
                                <button type='button' className='btn btn-link' onClick={() => this.changeToSignup()}>New to EasySale? Sign Up</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default LoginPage;