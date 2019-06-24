import React, { Component } from 'react';
import './LoginAndSignup.css';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import LoginPage from '../LoginPage/LoginPage';
import SignupPage from '../SignupPage/SignupPage';
class LoginAndSignup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            key: 'login'
        }
    }

    changeToSignup = () => {
        this.setState((state, props) => ({
            key: 'signup'
        }))
    }

    render() {
        return (
            <div className='background-div'>
                <div className='container tab-container'>
                    <Tab.Container activeKey={this.state.key} onSelect={key => this.setState({ key })}>
                        <div className='row'>
                            <Nav variant='tabs'>
                                <Nav.Item className='nav-item'>
                                    <Nav.Link eventKey='signup' className='nav-link'>Signup</Nav.Link>
                                </Nav.Item>
                                <Nav.Item className='nav-item'>
                                    <Nav.Link eventKey='login'>Login</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div>
                        <div className='row'>
                            <Tab.Content>
                                <Tab.Pane eventKey='signup'>
                                    <SignupPage />
                                </Tab.Pane>
                                <Tab.Pane eventKey='login'>
                                    <LoginPage changeToSignup={this.changeToSignup} />
                                </Tab.Pane>
                            </Tab.Content>
                        </div>
                    </Tab.Container>
                </div>
            </div>
        );
    }
}
export default LoginAndSignup;