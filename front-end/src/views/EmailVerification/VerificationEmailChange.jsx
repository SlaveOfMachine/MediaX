import React from 'react';
import { connect } from 'react-redux';
import BaseHelper from '../../components/common/BaseHelper';
import BaseInput from '../../components/common/BaseInput';
import { BaseButton } from '../../components/common/BaseLayoutFeatures';
import { changeEmail, checkHashExpiry, logout } from '../../store';

class VerificationEmailChange extends BaseHelper {

    state = {
        loading: false,
        errors: {},
        formParams: {
            email: '',
        },
        validated: false,
        pageName: 'email-change',
        canUpdate: false,
    }

    componentDidMount() {
        this.checkHash();
    }

    checkHash = () => {
        checkHashExpiry(this.props.match.params.hash)
            .then(response => {
                this.setState({
                    canUpdate: response.data.success
                });
            })
            .catch(error => {
                console.error(error);
                setTimeout(() => {
                    this.props.history.push('/');
                }, 3000);
            });
    }

    changeEmail = async () => {
        await this.validate();
        if (this.state.validated && this.state.canUpdate && !this.state.loading) {
            this.loading();
            changeEmail({
                email: this.state.formParams.email,
                hash: this.props.match.params.hash,
            }).then(() => {
                window.$alertMessage('Email changed, please login again');
                setTimeout(() => {
                    this.props.logout();
                }, 3000);
            }).catch(error => {
                console.error(error);
                this.loading();
            });
        }
    }

    handleChange = (event) => {
        const formParams = {
            email: event.target.value,
        }
        this.setState({ formParams });
    }

    render() {
        return (
            <div className="verification-container">
                <div className="verification-content">
                    <BaseInput 
                        className="base-input"
                        placeholder="Enter new email"
                        error={ this.state.errors.email }
                        value={ this.state.formParams.email }
                        onInputChange={ this.handleChange }
                        onEnterPressed={ this.changeEmail }
                    />
                    <BaseButton
                        type='primary'
                        title='Change'
                        loading={ this.state.loading }
                        clicked={ this.changeEmail }
                    />
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    logout: () => {
        dispatch(logout());
    }
})

export default connect(null, mapDispatchToProps)(VerificationEmailChange);