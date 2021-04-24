import React from 'react';
import { Link } from 'react-router-dom';
import BaseInput from '../components/common/BaseInput';
import FormValidator from '../assets/js/formValidator';
import axios from '../config/axios';

class Login extends React.Component {
    state = {
        formParams: {
            email: 'gau94rav@gmail.com',
            password: 'Channu@123',
        },
        validated: false,
        liveValidate: false,
        errors: {},
    }

    handleInputs = (event) => {
        const formParams = this.state.formParams;
        formParams[event.target.name] = event.target.value;

        if (this.state.liveValidate) this.validate();        
        this.setState({
            formParams,
        })
    }

    login = async () => {
        await this.validate();
        if (this.state.validated) {
            const data = this.state.formParams;
            axios.post('auth/login', data)
                .then(response => console.log(response))
                .catch(error => console.log(error))
        }
    }

    validate = () => {
        const formData = this.state.formParams;
        const errors = FormValidator.validateLoginForm(formData);
        const validated = Object.keys(errors).length === 0;

        this.setState({
            validated,
            liveValidate: true,
            errors,
        })
    }

    render() {
        const { errors, formParams } = this.state;
        const {
            email,
            password,
        } = formParams;
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
                                <BaseInput
                                    className='base-input auth-input'
                                    placeholder="EMAIL"
                                    name="email"
                                    value={email}
                                    onInputChange={this.handleInputs}
                                    onEnterPressed={this.login}
                                    type="email"
                                    error={errors.email}
                                />
                                <BaseInput
                                    className='base-input auth-input'
                                    placeholder="PASSWORD"
                                    name="password"
                                    value={password}
                                    onInputChange={this.handleInputs}
                                    onEnterPressed={this.login}
                                    type="password"
                                    error={errors.password}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="element-foot element-section">
                        <div className="element-section-content">
                            <button className="base-button form-btn" onClick={this.login}>LOGIN</button>
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