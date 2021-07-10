import React from 'react';
import BaseInput from '../common/BaseInput';
import { BaseButton, BaseTooltip } from '../common/BaseLayoutFeatures';
import BaseHelper from '../common/BaseHelper';
import { connect } from 'react-redux';
import BaseConfirmModal from '../common/BaseConfirmModal';
import { changeEmailMail, updateUser } from '../../store/actions/userActions';
import Icon from '@mdi/react';

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
        emailDialog: false,
        loading: false,
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

    toggleEmailDialog = () => {
        this.setState({
            emailDialog: !this.state.emailDialog
        })
    }

    loader = (loading = true) => {
        this.setState({ loading });
    }

    sendEmailChangeMail = () => {
        this.loader();
        changeEmailMail()
            .then(response => {
                this.loader(false);
                this.toggleEmailDialog();
            })
            .catch(error => {
                this.loader(false);
                console.log(error);
                this.toggleEmailDialog();
            });
    }

    save = async () => {
        await this.validate();
        if (this.state.validated) {
            this.props.updateUser(this.state.formParams);
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
                                toggleIcon='mdiCircleEditOutline'
                                disabled={true}
                                value={ email }
                                onInputChange={ this.handleInputs }
                                eventTriggered={ this.toggleEmailDialog }
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="input-label">
                            <label htmlFor='password' className="base-label" style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div>Password</div>
                                <BaseTooltip message="Not required to change other information" />
                            </label>
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
                        <div className="input-label" style={{position: 'relative', top: '5px'}}>
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
                <div className="modals">
                    {
                        this.state.emailDialog &&
                        <BaseConfirmModal
                            title='Change Email'
                            description='You will get a email containing the link, please click on it to change your current email.'
                            confirmButtonText='Send Email'
                            cancelButtonText="Don't Send"
                            close={ this.toggleEmailDialog }
                            confirm={ this.sendEmailChangeMail }
                            loading={ this.state.loading }
                        /> 
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
    updateUser: (payload) => {
        dispatch(updateUser(payload))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingAccount);