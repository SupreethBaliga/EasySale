import React, { Component } from 'react';
import './EditProfile.css';
import Paper from '@material-ui/core/Paper';


// let props = {
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


class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerName: this.props.customerName
        }
    }

    render() {
        return (
            <div className='col-md-12'>
                <div className='row edit-profile-top-bar'>
                    <div className='col-md-11'>
                        EDIT PROFILE
                    </div>
                    <div className='col-md-1'>
                        <button className='btn btn-dark'><i className='material-icons'>save</i>&nbsp;<span className='saveTest'>SAVE</span></button>
                    </div>
                </div>
                <div className='col-sm-8 offset-sm-2 mt-2'>
                    <form action='' method='post'>
                        <div className='form-group'>
                            <label className='labelText'>Organisation Name:</label>
                            <input type='text' disabled='disabled' value={this.props.orgName} className='form-control' />
                            <small className='text text-muted'>(This field cannot be changed)</small>
                        </div>
                        <div className='form-group'>
                            <label className='labelText'>Customer Name:</label>
                            <input type='text' className='form-control' placeholder={this.props.customerName} id='uniq' />
                        </div>
                        <div className='row'>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label className='labelText'>Email ID:</label>
                                    <input type='text' className='form-control' disabled='disabled' value={this.props.email} />
                                    <small className='text text-muted'>(This field cannot be changed)</small>
                                </div>
                            </div>
                            <div className='col-md-6'>
                                <div className='form-group'>
                                    <label className='labelText'>Mobile No:</label>
                                    <input type='text' className='form-control' placeholder={this.props.email} />
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-8'>
                                <div className='form-group'>
                                    <label className='labelText'>Delivery Address:</label>
                                    <textarea rows='2' className='form-control' placeholder={this.props.deliveryAddr} />
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className='form-group'>
                                    <label className='labelText'>Delivery Postal Code:</label>
                                    <input type="text" className='form-control' placeholder={this.props.deliveryPostalCode} />
                                </div>
                            </div>
                        </div>
                        <div className='form-group'>
                            <Paper>
                                <div class="accordion" id="accordionExample">
                                    <div class="card card-main">
                                        <div class="card-header" id="headingOne">
                                            <button class="btn btn-link no-dec" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                <div className='row m-0'>
                                                    <span className='text'>Organisation Details:</span>&nbsp;
                                                    <span className='text text-muted'>(only if you're an organisation)</span>
                                                    <i className='material-icons down-arrow'>keyboard_arrow_down</i>
                                                </div>
                                            </button>
                                        </div>

                                        <div id="collapseOne" className="collapse " data-parent="#accordionExample">
                                            <div className="card-body">
                                                <div className='row'>
                                                    <div className='col-md-6'>
                                                        <div className='form-group'>
                                                            <label className='labelText'>GST No:</label>
                                                            <input className='form-control' value={this.props.gstNo} disabled='disabled' />
                                                        </div>
                                                    </div>
                                                    <div className='col-md-6 form-group'>
                                                        <label className='labelText'>Landline No:</label>
                                                        <div className='row'>
                                                            <input placeholder={this.props.landlineCode} size='4' type='text' /> &nbsp;-&nbsp;
                                                            <input placeholder={this.props.landlineNumber} size='20' type='text' />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='form-group'>
                                                    <div className='row'>
                                                        <div className='col-md-8'>
                                                            <div className='form-group'>
                                                                <label className='labelText'>Company Address:</label>
                                                                <textarea rows='2' className='form-control' placeholder={this.props.companyAddr} />
                                                            </div>
                                                        </div>
                                                        <div className='col-md-4'>
                                                            <div className='form-group'>
                                                                <label className='labelText'>Company Postal Code:</label>
                                                                <input type="text" className='form-control' placeholder={this.props.companyPostalCode} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Paper>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default EditProfile;