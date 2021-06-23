import React from 'react';
import BaseInput from '../common/BaseInput';
import { BaseButton } from '../common/BaseLayoutFeatures';
import BaseHelper from '../common/BaseHelper';
import { connect } from 'react-redux';

class SettingAccount extends BaseHelper {
    state = {
        formParams: {
            name: '',
            email: '',
            new_password: '',
            old_password: '',
        },
        validated: false,
        liveValidate: false,
        errors: {},
        pageName: 'setting-profile',
    }

    componentDidMount() {
        this.populateUser();
    }

    populateUser = () => {
        const user = this.props.user;
        const formParams = {
            name: user.name,
            email: user.email,
            new_password: '',
            old_password: '',
        }
        this.setState({ formParams });
    }

    save = async () => {
        await this.validate();
        if (this.state.validated) {
            
        }
    }

    render() {
        const { name, email, new_password, old_password } = this.state.formParams;
        const { errors } = this.state;
        return (
            <div className="settings-section">
                <div className="section-head">
                    <div className="section-title">ACCOUNT</div>
                </div>
                <div className="section-body">
                    <div className="input-group">
                        <div className="input-label">
                            <label htmlFor='name' className="base-label">Name</label>
                            <BaseInput
                                placeholder='Enter name'
                                id='name'
                                name='name'
                                value={ name }
                                error={ errors.name }
                                onInputChange={ this.handleInputs }
                            />
                        </div>
                        <div className="input-label">
                            <label htmlFor='email' className="base-label">Email</label>
                            <BaseInput
                                placeholder='Enter email'
                                id='email'
                                name='email'
                                toggleText='Change'
                                disabled={true}
                                value={ email }
                                onInputChange={ this.handleInputs }
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="input-label">
                            <label htmlFor='password' className="base-label">Password</label>
                            <BaseInput
                                placeholder='Enter new password'
                                id='new_password'
                                name='new_password'
                                type='password'
                                value={ new_password }
                                error={ errors.new_password }
                                onInputChange={ this.handleInputs }
                            />
                        </div>
                        <div className="input-label">
                            <label htmlFor='old_password' className="base-label">Confirm Old Password</label>
                            <BaseInput
                                placeholder='Confirm old password'
                                id='old_password'
                                name='old_password'
                                type='password'
                                value={ old_password }
                                error={ errors.old_password }
                                onInputChange={ this.handleInputs }
                            />
                        </div>
                    </div>
                </div>
                <div className="section-foot">
                    <BaseButton
                        type='primary'
                        title='Save'
                        clicked={ this.save }
                    />
                    <BaseButton
                        type='danger'
                        title='Reset'
                        clicked={ this.populateUser }
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
})

export default connect(mapStateToProps, null)(SettingAccount);