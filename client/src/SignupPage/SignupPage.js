import React, { Component } from 'react';
import './SignupPage.css';
import axios from 'axios';

class SignupPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            customer_name: "",
            mobile_number: "",
            address: "",
            delivery_postal_code: "",
            company_address: "",
            landline_number: "",
            company_postal_code: "",
            gst_number: "",
            organisation_name: "",
            email: "",
            password: "",
            password_confirm: ""
        }
    }

    changeName(){
        this.setState({
            customer_name: document.getElementById("customer_name_signup").value
        })
    }
    changeMobile(){
        this.setState({
            mobile_number: document.getElementById("mobile_number_signup").value
        })
    }
    changeAddress(){
        this.setState({
            address: document.getElementById("address_signup").value
        })
    }
    changeDeliveryCode(){
        this.setState({
            delivery_postal_code: document.getElementById("delivery_postal_code_signup").value
        })
    }
    changeCompanyAddress(){
        this.setState({
            company_address: document.getElementById("company_address_signup").value
        })
    }
    changeCompanyPostalCode(){
        this.setState({
            company_postal_code: document.getElementById("company_postal_code_signup").value
        })
    }
    // changeLandlineCode(){
    //     this.setState({
    //         landline_code: document.getElementById("landline_code_signup").value
    //     })
    // }
    changeLandlineNumber(){
        this.setState({
            landline_number: document.getElementById("landline_number_signup").value
        })
    }
    changeGSTNumber(){
        this.setState({
            gst_number: document.getElementById("gst_number_signup").value
        })
    }
    changeEmail(){
        this.setState({
            email: document.getElementById("email_signup").value
        })
    }
    changeOrganisationName(){
        this.setState({
            organisation_name: document.getElementById("organisation_name_signup").value  
        })
    }
    changePassword(){
        this.setState({
            password: document.getElementById("password_signup").value
        })
    }
    changePasswordConfirm(){
        this.setState({
            password_confirm: document.getElementById("password_confirm_signup").value
        })
    }

    handleClick = (event) =>{
        if(this.state.password !== this.state.password_confirm){
            console.log("Does not match");
            return;
        }
        console.log("Going into auth");
        axios.post("/api/join",
        {
            "name": this.state.customer_name,
            "email": this.state.email,
            "contactNumber": this.state.mobile_number,
            "deliveryAddress": this.state.address,
            "deliveryPostalCode": this.state.delivery_postal_code,
            "organisationName": this.state.organisation_name,
            "GSTNumber": this.state.gst_number,
            "officeNumber": this.state.landline_number,
            "companyAddress": this.state.company_address,
            "companyPostalCode": this.state.company_postal_code,
            "password": this.state.password
        })
        .then(res => {
            console.log(res);
            console.log(this.state.name+ "  " + this.state.gst_number);
            window.location.pathname = '/login';
        })
        .catch(error => {
            console.log(error);
        })
    }
    render() {
        return (
            <div className='signup-page'>
                <br />
                <form>
                    <div className='bordered-section ml-2 mr-2 mb-2'>
                        <span className='section-header'><u>Personal Details</u>:<span className='asterisk'>*</span></span>
                        <div className='col-sm-12'>
                            <div className='form-group'>
                                <label className='signupLabelText'>Customer Name: </label>
                                <input type='text' id="customer_name_signup" onChange={()=>this.changeName()} className='form-control' />
                            </div>
                            <div className='form-group'>
                                <div className='row'>
                                    <div className='col-sm-7'>
                                        <div className='form-group'>
                                            <label className='signupLabelText'>Email Id: </label>
                                            <input type='email' id="email_signup" onChange={()=> this.changeEmail()} className='form-control' placeholder='abc@example.com' />
                                        </div>
                                    </div>
                                    <div className='col-sm-5'>
                                        <div className='form-group'>
                                            <label className='signupLabelText'>Mobile No: </label>
                                            <input type='text' id="mobile_number_signup" onChange={() => this.changeMobile()} className='form-control' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='form-group'>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <label className='signupLabelText'>Password:</label>
                                        <input onChange={()=> this.changePassword()} id="password_signup" type='password' className='form-control'/>
                                    </div>
                                    <div className='col-md-6'>
                                        <label className='signupLabelText'>Confirm Password:</label>
                                        <input type='password' onChange={()=> this.changePasswordConfirm()} id="password_confirm_signup" className='form-control'/>
                                    </div>
                                </div>
                            </div>
                            <div className='form-group'>
                                <div className='row'>
                                    <div className='col-sm-8'>
                                        <label className='signupLabelText'>Delivery Address:</label>
                                        <textarea onChange={()=>this.changeAddress()} id="address_signup" className='form-control'></textarea>
                                    </div>
                                    <div className='col-sm-4'>
                                        <label className='signupLabelText'>Delivery Postal Code:</label>
                                        <input type='text' id="delivery_postal_code_signup" onChange={()=>this.changeDeliveryCode()} className='form-control' />
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
                                <input id="organisation_name_signup" onChange={()=> this.changeOrganisationName()} type='text' className='form-control' />
                            </div>
                            <div className='form-group'>
                                <div className='row'>
                                    <div className='col-sm-7'>
                                        <div className='form-group'>
                                            <label className='signupLabelText'>GST No: </label>
                                            <input id="gst_number_signup" onChange={()=> this.changeGSTNumber()} type='text' className='form-control' />
                                        </div>
                                    </div>
                                    <div className='col-sm-5'>
                                        <div className='form-group'>
                                            <label className='signupLabelText'>Landline No: </label>
                                            <input type='text' id="landline_number_signup" onChange={()=> this.changeLandlineNumber()} className='form-control' placeholder='Example: 022-29207477' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='form-group'>
                                <div className='row'>
                                    <div className='col-sm-8'>
                                        <label className='signupLabelText'>Company Address:</label>
                                        <textarea id="company_address_signup" onChange={()=> this.changeCompanyAddress()} className='form-control'></textarea>
                                    </div>
                                    <div className='col-sm-4'>
                                        <label className='signupLabelText'>Company Postal Code:</label>
                                        <input type='text' id="company_postal_code_signup" onChange={()=> this.changeCompanyPostalCode()} className='form-control' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className='form-group col-md-6 offset-sm-3'>
                        <button onClick={() => this.handleClick()} type='submit' className='btn btn-dark form-control button'>SIGN-UP</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignupPage;