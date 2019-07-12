import React, { Component } from 'react';
import './LoginPage.css';
import axios from 'axios';
class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state= {
            email: "",
            password: ""
        }
    }

    keyPressed = (event) => {
        if(event.charCode==13) {
            this.handleLogin();
        }
        return;
    }

    handleLogin = () => {
        var params = {
            "username" : this.state.email,
            "password" : this.state.password
        }
        axios({
            method: "post",
            url: "/api/login",
            data: params
        }).then(res=>{
            if(res.data === "Login Successful"){
                if(this.state.email === "admin@gmail.com") {
                    window.location.assign('//seller.easysale.live');
                }
                else {
                    window.location.pathname = '/home';
                }
            }
            else {
                alert("Invalid Credentials!");
                window.location.pathname = '/login';
            }
        }).catch(error=>{
            console.log(error);
        });
    }
    emailLogin = () => {
        this.setState((state,props) => ({
            email: document.getElementById("email-login-page").value
        }));
    }

    passwordLogin = () => {
        this.setState((state,props) => ({
            password: document.getElementById("password-login-page").value
        }));
    }
                
    render() {
        return (
            <div className='login-page'>
                <form>
                    <br /><br /><br />
                    <div className='col-sm-10 offset-sm-1'>
                        <div className='form-group ml-2 mr-2 mb-2'>
                            <label className='loginLabelText'>Email:</label>
                            <input type='email' className='form-control' placeholder='abc@example.com' id="email-login-page" onChange={() => this.emailLogin()} onKeyPress={this.keyPressed}/>
                        </div>
                        <div className='form-group ml-2 mr-2 mb-2'>
                            <label className='loginLabelText'>Password:</label>
                            <input type='password' className='form-control' id="password-login-page" onChange={() => this.passwordLogin()}  onKeyPress={this.keyPressed}/>
                        </div>
                        <br />
                        <div className='form-group'>
                            <div className='col-sm-6 offset-sm-3'>
                                <button type='button' className='btn btn-dark form-control button' onClick={() => this.handleLogin()}>LOGIN</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default LoginPage;
