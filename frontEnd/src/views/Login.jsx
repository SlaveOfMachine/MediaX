import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    render() {
        return (
            <div className='auth-page-container'>
                <div className="auth-page-content">
                    <div className="element-header element-section">
                        <div className="element-section-content">
                            <div className="element-section-title">
                                LOGIN
                            </div>
                        </div>
                    </div>
                    <div className="element-body element-section">
                        <div className="element-section-content">
                            <div className="auth-form">
                                <input
                                    type="text"
                                    className="base-input auth-input"
                                    placeholder="EMAIL" />
                                <input
                                    type="password"
                                    className="base-input auth-input"
                                    placeholder="PASSWORD" />
                            </div>
                        </div>
                    </div>
                    <div className="element-foot element-section">
                        <div className="element-section-content">
                            <button className="base-button form-btn">LOGIN</button>
                            <Link to='/register'>
                                <button className="base-button form-btn">REGISTER</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;