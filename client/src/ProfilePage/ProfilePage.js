import React, { Component } from 'react';
import './ProfilePage.css';


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

class ProfilePage extends Component {
    render() {
        return (
            <div className='full-page col-md-12'>
                <div className='row top-div'>
                    <div className='col-md-11 orgName'>
                        {this.props.orgName}
                    </div>
                    <div className='col-md-1'>
                        <a className='btn btn-dark top-div-btn' href="/editprofile"><i className='material-icons'>edit</i> Edit</a>
                    </div>
                </div>
                <div className='row m-2 text-fields'>
                    <div className='col-md-4'>
                        <label className='field-label'>Customer Name : &nbsp;</label>
                        <span className='field-label-value'> {this.props.customerName}</span>
                    </div>
                </div>
                <div className='row m-2 text-fields'>
                    <div className='col-md-4'>
                        <label className='field-label'>GST No. : &nbsp;</label>
                        <span className='field-label-value'>
                            {(() => {
                                switch (this.props.gstNo) {
                                    case '': return <span className='text text-muted'>Not Provided</span>;
                                    default: return this.props.gstNo
                                }
                            })()}
                        </span>
                    </div>
                </div>
                <div className='row m-2 text-fields'>
                    <div className='col-md-5'>
                        <label className='field-label'>E-mail : &nbsp;</label>
                        <span className='field-label-value'>{this.props.email}</span>
                    </div>
                </div>
                <div className='row m-2 text-fields'>
                    <div className='col-md-2'>
                        <label className='field-label'>Delivery Address :&nbsp;</label>
                    </div>
                    <div className='col-md-4'>
                        {this.props.deliveryAddr + '.'}
                    </div>
                    <div className='col-md-2'></div>
                    <div className='col-md-4'>
                        <label className='field-label'>Delivery Postal Code :&nbsp;</label>
                        <span className='field-label-value'>{this.props.deliveryPostalCode}</span>
                    </div>
                </div>
                <div className='row m-2 text-fields'>
                    <div className='col-md-2'>
                        <label className='field-label'>Company Address :&nbsp;</label>
                    </div>
                    <div className='col-md-4'>
                        {(() => {
                            switch (this.props.companyAddr) {
                                case '': return <span className='text text-muted'>Not Provided</span>;
                                default: return this.props.companyAddr + '.';
                            }
                        })()}
                    </div>
                    <div className='col-md-2'></div>
                    <div className='col-md-4'>
                        <label className='field-label'>Company Postal Code :&nbsp;</label>
                        <span className='field-label-value'>
                            {(() => {
                                switch (this.props.companyAddr) {
                                    case '': return <span className='text text-muted'>Not Provided</span>;
                                    default: return <span className='field-label-value'>{this.props.companyPostalCode}</span>
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
                                switch (this.props.landlineNumber) {
                                    case '': return <span className='text text-muted'>Not Provided</span>;
                                    default: return this.props.landlineCode + '-' + this.props.landlineNumber
                                }
                            })()}
                        </span>
                    </div>
                </div>
                <div className='row m-2 text-fields'>
                    <div className='col-md-4'>
                        <label className='field-label'>Mobile : &nbsp;</label>
                        <span className='field-label-value'>{this.props.mobileNumber}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfilePage;