import { Link } from 'react-router-dom';
import BaseInput from '../components/common/BaseInput';
import BaseHelper from '../components/common/BaseHelper';
import axios from '../helpers/axios';

class Login extends BaseHelper {
    state = {
        formParams: {
            email: '',
            password: '',
        },
        validated: false,
        liveValidate: false,
        errors: {},
        showPassword: false,
        authLevel: false,
    }

    login = async () => {
        await this.validate('login');
        if (this.state.validated) {
            const data = this.state.formParams;
            axios.post('auth/login', data)
                .then(response => this.handleAuthResponse(response))
                .catch(error => console.log(error))
        }
    }

    render() {
        const { errors, formParams, showPassword } = this.state;
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
                                    type={showPassword ? 'text' : 'password'}
                                    error={errors.password}
                                    toggleText={showPassword ? 'HIDE' : 'SHOW'}
                                    eventTriggered={this.passwordTypeSwitch}
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