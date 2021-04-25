import { Link } from 'react-router-dom';
import axios from '../config/axios';
import BaseInput from '../components/common/BaseInput';
import BaseHelper from '../components/common/BaseHelper';

class Register extends BaseHelper {

    state = {
        formParams: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validated: false,
        liveValidate: false,
        errors: {},
        showPassword: false,
    }

    register = async () => {
        this.validate('validateRegisterForm');
        if (this.state.validated) {
            const data = this.state.formParams;
            axios.post('auth/register', data)
                .then(response => console.log(response))
                .catch(error => console.log(error))
        }
    }

    render() {
        const { errors, formParams } = this.state;
        const {
            name,
            email,
            password,
            confirmPassword,
        } = formParams;

        return (
            <div className='auth-page-container'>
                <div className="auth-page-content">
                    <div className="element-header element-section">
                        <div className="element-section-content">
                            <div className="element-section-title">
                                REGISTER
                            </div>
                        </div>
                    </div>
                    <div className="element-body element-section">
                        <div className="element-section-content">
                            <div className="auth-form">
                                <BaseInput
                                    className='base-input auth-input'
                                    placeholder="NAME"
                                    name="name"
                                    value={name}
                                    onInputChange={this.handleInputs}
                                    onEnterPressed={this.register}
                                    type="text"
                                    error={errors.name}
                                />
                                <BaseInput
                                    className='base-input auth-input'
                                    placeholder="EMAIL"
                                    name="email"
                                    value={email}
                                    onInputChange={this.handleInputs}
                                    onEnterPressed={this.register}
                                    type="email"
                                    error={errors.email}
                                />
                                <BaseInput
                                    className='base-input auth-input'
                                    placeholder="PASSWORD"
                                    name="password"
                                    value={password}
                                    onInputChange={this.handleInputs}
                                    onEnterPressed={this.register}
                                    type="password"
                                    error={errors.password}
                                />
                                <BaseInput
                                    className='base-input auth-input'
                                    placeholder="CONFIRM PASSWORD"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onInputChange={this.handleInputs}
                                    onEnterPressed={this.register}
                                    type="password"
                                    error={errors.confirmPassword}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="element-foot element-section">
                        <div className="element-section-content">
                            <button className="base-button form-btn" onClick={this.register}>REGISTER</button>
                            <Link to='/'>
                                <button className="base-button form-btn">LOGIN</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;