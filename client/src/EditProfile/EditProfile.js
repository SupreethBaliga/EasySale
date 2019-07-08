import React, { Component } from 'react';
import './EditProfile.css';
import Paper from '@material-ui/core/Paper';
import Axios from 'axios';


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
let user_id = "";

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //customerName: this.props.customerName,
            info:[],
            customer_name: "",
            mobile_number: "",
            address: "",
            delivery_postal_code: "",
            company_address: "",
            landline_code: "",
            landline_number: "",
            company_postal_code: ""
        }
    }
    
    componentDidMount(){
        
        //get user_id here from session
        // console.log("adiaiudh");
        var url = "/api/users/"
        Axios.get("/api/getuser/")
        .then( res => {
            user_id = res.data.id;
            url = url + user_id;
            console.log(url);
        })
        .then(res => {
            Axios.get(url)
                .then(res => {
                    console.log(url);
                    const data1 = res.data;
                    //console.log({data1});
                    this.setState({
                        info: data1
                    })
                    console.log(this.state.info);
                    this.populate();
                    this.setState({
                        customer_name : this.state.info.name,
                        address : this.state.info.deliveryaddress,
                        mobile_number: this.state.info.contactnumber,
                        delivery_postal_code: this.state.info.deliverypostalcode,
                        company_address: this.state.info.companyaddress,
                        company_postal_code: this.state.info.companypostalcode,
                        landline_code: this.state.info.officenumber.split('-')[0],
                        landline_number: this.state.info.officenumber.split('-')[1]
                    })
                // console.log(this.state.info.deliverypostalcode);
                    // this.setState((state,props)=>({
                    //     customerName: this.state.info.name
                    // }));
                    

                })
        })
        
    }
    populate = () =>{
        this.setState({
            info: this.state.info
        })
    }
    changeName(){
        this.setState({
            customer_name: document.getElementById("customer_name_edit_profile").value
        })
    }
    changeMobile(){
        this.setState({
            mobile_number: document.getElementById("mobile_number_edit_profile").value
        })
    }
    changeAddress(){
        this.setState({
            address: document.getElementById("address_edit_profile").value
        })
    }
    changeDeliveryCode(){
        this.setState({
            delivery_postal_code: document.getElementById("delivery_postal_code_edit_profile").value
        })
    }
    changeCompanyAddress(){
        this.setState({
            company_address: document.getElementById("company_address_edit_profile").value
        })
    }
    changeCompanyPostalCode(){
        this.setState({
            company_postal_code: document.getElementById("company_postal_code_edit_profile").value
        })
    }
    changeLandlineCode(){
        this.setState({
            landline_code: document.getElementById("landline_code_edit_profile").value
        })
    }
    changeLandlineNumber(){
        this.setState({
            landline_number: document.getElementById("landline_number_edit_profile").value
        })
    }

    handleClick = (event) => {
        // event.preventDefault();
        // var user_id = "f0ef6937-b529-4fe2-bef0-85d38b2ee468";
        //find user_id from session here
        console.log(this.state.info);
        console.log(this.state.info.email);
        var u = "/api/users/"+user_id;

        Axios.put(u,
            {
                "name": this.state.customer_name,
                "email": this.state.info.email,
                "contactNumber": this.state.mobile_number,
                "deliveryAddress": this.state.address,
                "deliveryPostalCode": this.state.delivery_postal_code,
                "organisationName": this.state.info.organisationname,
                "GSTNumber": this.state.info.gstnumber,
                "officeNumber": this.state.landline_code + "-" + this.state.landline_number,
                "companyAddress": this.state.company_address,
                "companyPostalCode": this.state.company_postal_code
            
        }
        ).then(res => {
            console.log(res);
        }).catch(error => {
            console.log(error);
        })
        
    }
    render() {
        return (
            <div className='col-md-12'>
                <div className='row edit-profile-top-bar'>
                    <div className='col-md-11'>
                        EDIT PROFILE
                    </div>
                    <div className='col-md-1'>  
                        <button className='btn btn-dark' onClick={() => this.handleClick()}><i className='material-icons'>save</i>&nbsp;<span className='saveTest'>SAVE</span></button>
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
                            <input type='text' id="customer_name_edit_profile" onChange={()=>this.changeName()} className='form-control' placeholder={this.props.customerName} />
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
                                    <input type='text' id="mobile_number_edit_profile" onChange={() => this.changeMobile()} className='form-control' placeholder={this.props.mobileNumber} />
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-md-8'>
                                <div className='form-group'>
                                    <label className='labelText'>Delivery Address:</label>
                                    <textarea onChange={()=>this.changeAddress()} id="address_edit_profile" rows='2' className='form-control' placeholder={this.props.deliveryAddr} />
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className='form-group'>
                                    <label className='labelText'>Delivery Postal Code:</label>
                                    <input id="delivery_postal_code_edit_profile" onChange={()=>this.changeDeliveryCode()} type="text" className='form-control' placeholder={this.props.deliveryPostalCode} />
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
                                                            <input id="landline_code_edit_profile" onChange={()=> this.changeLandlineCode()} placeholder={this.props.landlineCode} size='4' type='text' /> &nbsp;-&nbsp;
                                                            <input id="landline_number_edit_profile" onChange={()=> this.changeLandlineNumber()} placeholder={this.props.landlineNumber} size='20' type='text' />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='form-group'>
                                                    <div className='row'>
                                                        <div className='col-md-8'>
                                                            <div className='form-group'>
                                                                <label className='labelText'>Company Address:</label>
                                                                <textarea id="company_address_edit_profile" onChange={()=> this.changeCompanyAddress()} rows='2' className='form-control' placeholder={this.props.companyAddr} />
                                                            </div>
                                                        </div>
                                                        <div className='col-md-4'>
                                                            <div className='form-group'>
                                                                <label className='labelText'>Company Postal Code:</label>
                                                                <input id="company_postal_code_edit_profile" onChange={()=> this.changeCompanyPostalCode()} type="text" className='form-control' placeholder={this.props.companyPostalCode} />
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