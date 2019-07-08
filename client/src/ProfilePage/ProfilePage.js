import React, { Component } from 'react';
import './ProfilePage.css';
import axios from 'axios';

// let profile = {
//   customerName: 'Dipesh Khandelwal',
//   orgName: 'Khandelwal Paper Products',
//   gstNo: '12345678f0b23a5',
//   landlineCode: '0141',
//   landlineNumber: '24102729',
//   mobileNumber: '9879649801',
//   email: 'abcd@efgh.com',
//   companyAddr: '1-D-93, Lalita Shastri Nagar, Jaipur',
//   deliveryAddr: 'C204, Manavsthal Heights, Off Military Road, Andheri-(E), Mumbai',
//   companyPostalCode: '789162',
//   deliveryPostalCode: '400072'
// }

var user_id = ""
class ProfilePage extends Component {
    constructor(props){
        super(props);
        this.state = {
            info:[]
        }
    }
    componentDidMount(){
        // var user_id = "f0ef6937-b529-4fe2-bef0-85d38b2ee468";
        // get user_id from session here
        axios.get('/api/getuser')
        .then(res => {
            user_id = res.data.id;
        })
        .then(res => {
            axios.get("/api/users/"+user_id)
            .then(res => {
                const data1 = res.data;
                this.setState({
                    info: data1
                })
                console.log(this.state.info);
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
                                    case '': return <span className='text text-muted'>Not Provided</span>;
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
                                case '': return <span className='text text-muted'>Not Provided</span>;
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
                                    case '': return <span className='text text-muted'>Not Provided</span>;
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
                                    case '': return <span className='text text-muted'>Not Provided</span>;
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