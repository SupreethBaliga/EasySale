import React, { Component } from 'react';
import './ProfilePage.css';
import axios from 'axios';

var user_id = ""
class ProfilePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            info:[]
        }
    }
    componentDidMount(){
        axios.get('/api/getuser')
        .then(res => {
            if(res.data == null) window.location.href = '/';
            else user_id = res.data.id;
        })
        .then(res => {
            axios.get("/api/users/"+user_id)
            .then(res => {
                const data1 = res.data;
                this.setState({
                    info: data1
                })
                this.populate();
            })
            .catch(err => {
                console.log(err);
            });
        })
        .catch(err => {
            console.log(err);
        })
    }
    populate(){
        this.setState({
            info: this.state.info
        })
    }
    render() {
        return (
            <div className='full-page col-md-12'>
                <div className='row top-div'>
                    <div className='col-md-11 orgName'>
                        {this.state.info.organisationname}
                    </div>
                    <div className='col-md-1'>
                        <a className='btn btn-dark top-div-btn' href="/editprofile"><i className='material-icons'>edit</i> Edit</a>
                    </div>
                </div>
                <div className='row m-2 text-fields'>
                    <div className='col-md-4'>
                        <label className='field-label'>Customer Name : &nbsp;</label>
                        <span className='field-label-value'> {this.state.info.name}</span>
                    </div>
                </div>
                <div className='row m-2 text-fields'>
                    <div className='col-md-4'>
                        <label className='field-label'>GST No. : &nbsp;</label>
                        <span className='field-label-value'>
                            {(() => {
                                switch (this.state.info.gstnumber) {
                                    case "Not Provided": return <span className='text text-muted'>Not Provided</span>;
                                    default: return this.state.info.gstnumber
                                }
                            })()}
                        </span>
                    </div>
                </div>
                <div className='row m-2 text-fields'>
                    <div className='col-md-5'>
                        <label className='field-label'>E-mail : &nbsp;</label>
                        <span className='field-label-value'>{this.state.info.email}</span>
                    </div>
                </div>
                <div className='row m-2 text-fields'>
                    <div className='col-md-2'>
                        <label className='field-label'>Delivery Address :&nbsp;</label>
                    </div>
                    <div className='col-md-4'>
                        {this.state.info.deliveryaddress + '.'}
                    </div>
                    <div className='col-md-2'></div>
                    <div className='col-md-4'>
                        <label className='field-label'>Delivery Postal Code :&nbsp;</label>
                        <span className='field-label-value'>{this.state.info.deliverypostalcode}</span>
                    </div>
                </div>
                <div className='row m-2 text-fields'>
                    <div className='col-md-2'>
                        <label className='field-label'>Company Address :&nbsp;</label>
                    </div>
                    <div className='col-md-4'>
                        {(() => {
                            switch (this.state.info.companyaddress) {
                                case "Not Provided": return <span className='text text-muted'>Not Provided</span>;
                                default: return this.state.info.companyaddress + '.';
                            }
                        })()}
                    </div>
                    <div className='col-md-2'></div>
                    <div className='col-md-4'>
                        <label className='field-label'>Company Postal Code :&nbsp;</label>
                        <span className='field-label-value'>
                            {(() => {
                                switch (this.state.info.companyaddress) {
                                    case "Not Provided": return <span className='text text-muted'>Not Provided</span>;
                                    default: return <span className='field-label-value'>{this.state.info.companypostalcode}</span>
                                }
                            })()}
                        </span>
                    </div>
                </div>
                <div className='row m-2 text-fields'>
                    <div className='col-md-4'>
                        <label className='field-label'>Landline : &nbsp;</label>
                        <span className='field-label-value'>
                            {(() => {
                                switch (this.state.info.officenumber) {
                                    case "Not Provided": return <span className='text text-muted'>Not Provided</span>;
                                    case "Not Provided-undefined": return <span className='text text-muted'>Not Provided</span>;
                                    default: return this.state.info.officenumber
                                }
                            })()}
                        </span>
                    </div>
                </div>
                <div className='row m-2 text-fields'>
                    <div className='col-md-4'>
                        <label className='field-label'>Mobile : &nbsp;</label>
                        <span className='field-label-value'>{this.state.info.contactnumber}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfilePage;
